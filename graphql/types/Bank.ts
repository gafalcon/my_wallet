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
    t.list.field("banks", {
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
        name: stringArg(),
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
        const userId = ctx.user[`${process.env.AUTH0_BASE_URL}/userId`];
        console.log(userId);
        console.log(ctx.user);
        return await ctx.prisma.bank.create({
          data: { name: args.name },
        });
      },
    });
  },
});
