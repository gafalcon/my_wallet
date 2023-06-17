import {
  objectType,
  enumType,
  extendType,
  nonNull,
  stringArg,
  intArg,
  floatArg,
  arg,
} from "nexus";
import { Tag } from "./Tag";
import { Context } from "../context";
import { User } from "./User";
import { Account } from "./Account";

export const Transaction = objectType({
  name: "Transaction",
  definition(t) {
    t.int("id");
    t.string("description");
    t.string("category");
    t.nonNull.float("amount");
    t.field("type", { type: TransactionType });
    t.date("date");
    t.nonNull.field("account", {
      type: Account,
      async resolve(_parent, _args, ctx: Context) {
        return await ctx.prisma.transaction
          .findUnique({ where: { id: _parent.id } })
          .account();
      },
    });
    t.nonNull.list.field("tags", {
      type: Tag,
      async resolve(_parent, _args, ctx: Context) {
        return await ctx.prisma.transaction
          .findUnique({ where: { id: _parent.id } })
          .tags();
      },
    });
    t.nonNull.field("user", {
      type: User,
      async resolve(_parent, _args, ctx: Context) {
        return await ctx.prisma.account
          .findUnique({
            where: { id: _parent.id },
          })
          .user();
      },
    });
  },
});

const TransactionType = enumType({
  name: "TransactionType",
  members: ["DEBIT", "PROFIT"],
});

export const TransactionsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("transactions", {
      type: "Transaction",
      async resolve(_, _args, ctx: Context) {
        return await ctx.prisma.account.findMany();
      },
    });
  },
});

export const CreateTransactionMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTransaction", {
      type: Transaction,
      args: {
        description: stringArg(),
        category: stringArg(),
        amount: nonNull(floatArg()),
        accountId: nonNull(intArg()),
        type: nonNull(
          arg({
            type: TransactionType,
          })
        ),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`);
        }
        const userId = ctx.user[`${process.env.AUTH0_BASE_URL}/userId`];

        if (typeof userId !== "number") {
          throw new Error(`You need to be logged in to perform an action`);
        }
        const data: any = {
          description: args.description || "",
          amount: args.amount,
          account: { connect: { id: args.accountId } },
          type: args.type,
        };
        if (args.category) {
          data.category = { connect: { id: args.category } };
        }
        const transaction = await ctx.prisma.transaction.create({
          data,
        });

        // todo update account value
        const total_amount =
          args.type === "DEBIT"
            ? { decrement: args.amount }
            : { increment: args.amount };
        await ctx.prisma.account.update({
          data: {
            total_amount,
          },
          where: {
            id: args.accountId,
          },
        });
        return transaction;
      },
    });
  },
});
