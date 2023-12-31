import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  intArg,
  floatArg,
} from "nexus";
import { Bank } from "./Bank";
import { Context } from "../context";
import { User } from "./User";
import { Transaction } from "./Transaction";

export const Account = objectType({
  name: "Account",
  definition(t) {
    t.int("id");
    t.nonNull.string("name");
    t.nonNull.float("total_amount");
    t.nonNull.field("bank", {
      type: Bank,
      async resolve(_parent, _args, ctx: Context) {
        return await ctx.prisma.account
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .bank();
      },
    });
    t.nonNull.field("user", {
      type: User,
      async resolve(parent, _args, ctx: Context) {
        return await ctx.prisma.account
          .findUnique({
            where: { id: parent.id! },
          })
          .user();
      },
    });
    t.nonNull.list.nonNull.field("transactions", {
      type: Transaction,
      async resolve(parent, _args, ctx: Context) {
        return await ctx.prisma.account
          .findUnique({ where: { id: parent.id! } })
          .transactions();
      },
    });
  },
});

export const AccountsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("accounts", {
      type: Account,
      args: {
        bankId: intArg(),
      },
      async resolve(_, args, ctx: Context) {
        if (args.bankId) {
          return await ctx.prisma.account.findMany({
            where: { bankId: args.bankId },
          });
        }
        return await ctx.prisma.account.findMany();
      },
    });
  },
});

export const AccountQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("account", {
      type: Account,
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_, args, ctx: Context) {
        return await ctx.prisma.account.findUnique({
          where: { id: args.id },
        });
      },
    });
  },
});

export const CreateAccountMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createAccount", {
      type: Account,
      args: {
        name: nonNull(stringArg()),
        bankId: nonNull(intArg()),
        total_amount: floatArg(),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`);
        }
        const userId = ctx.user[`${process.env.AUTH0_BASE_URL}/userId`];

        if (typeof userId !== "number") {
          throw new Error(`You need to be logged in to perform an action`);
        }
        return await ctx.prisma.account.create({
          data: {
            name: args.name,
            total_amount: args.total_amount || 0,
            bankId: args.bankId,
            userId,
          },
        });
      },
    });
  },
});
