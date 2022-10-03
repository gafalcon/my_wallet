import { objectType, enumType } from "nexus";
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
