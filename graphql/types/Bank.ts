import { objectType, extendType, stringArg, nonNull } from "nexus";
import { Context } from "../context";

export const Bank = objectType({
  name: "Bank",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
  },
});

export const BanksQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("banks", {
      type: "Bank",
      async resolve(_, _args, ctx: Context) {
        return await ctx.prisma.bank.findMany();
      },
    });
  },
});

export const BankQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("bank", {
      type: "Bank",
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_, args, ctx: Context) {
        return await ctx.prisma.bank.findUnique({ where: { name: args.name } });
      },
    });
  },
});

export const CreateLinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createBank", {
      type: Bank,
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`);
        }
        const userId = ctx.user[`${process.env.AUTH0_BASE_URL}/userId`];
        if (typeof userId !== "number") {
          throw new Error(`You need to be logged in to perform an action`);
        }
        return await ctx.prisma.bank.create({
          data: { name: args.name },
        });
      },
    });
  },
});
