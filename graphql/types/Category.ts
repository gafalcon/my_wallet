import { objectType, extendType, stringArg, nonNull } from "nexus";
import { Context } from "../context";

export const Category = objectType({
  name: "Category",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("value");
  },
});

export const CategoriesQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("categories", {
      type: Category,
      async resolve(_, _args, ctx: Context) {
        return await ctx.prisma.category.findMany();
      },
    });
  },
});

export const CreateCategoryMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createCategory", {
      type: Category,
      args: {
        value: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.category.create({
          data: { value: args.value },
        });
      },
    });
  },
});
