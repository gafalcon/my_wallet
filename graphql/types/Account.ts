import { objectType } from "nexus";
import { Bank } from "./Bank";
import { Context } from "../context";
import { User } from "./User";

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
              id: _parent.id,
            },
          })
          .bank();
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
