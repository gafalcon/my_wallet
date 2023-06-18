import { objectType, extendType, stringArg, nonNull } from "nexus";
import { Context } from "../context";

export const Category = objectType({
  name: "Category",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("value");
  },
});

export const CategoryCreatePayload = objectType({
  name: "CategoryCreatePayload",
  definition(t) {
    t.field("Category", { type: Category });
    t.nonNull.list.nonNull.string("errors");
  },
});

export const CategoriesQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("categories", {
      type: Category,
      async resolve(_, _args, ctx: Context) {
        return await ctx.prisma.category.findMany();
      },
    });
  },
});

export const CategoryCreateMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("categoryCreate", {
      type: CategoryCreatePayload,
      args: {
        value: nonNull(stringArg()),
      },
      async resolve(_parent, { value }, ctx) {
        if (!value) {
          return { errors: ["Need to provide category value"] };
        }
        try {
          const Category = await ctx.prisma.category.create({
            data: { value: value },
          });
          return { Category, errors: [] };
        } catch (err) {
          console.warn(err);
          return { errors: [(err as Error).message] };
        }
      },
    });
  },
});
