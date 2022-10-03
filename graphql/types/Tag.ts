import { objectType, extendType, stringArg, nonNull } from "nexus";
import { Context } from "../context";

export const Tag = objectType({
  name: "Tag",
  definition(t) {
    t.int("id");
    t.nonNull.string("value");
  },
});

export const TagsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("tags", {
      type: Tag,
      async resolve(_, _args, ctx: Context) {
        return await ctx.prisma.tag.findMany();
      },
    });
  },
});

export const CreateTagMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTag", {
      type: Tag,
      args: {
        value: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.tag.create({
          data: { value: args.value },
        });
      },
    });
  },
});
