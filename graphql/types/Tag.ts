import { objectType } from "nexus";

export const Tag = objectType({
  name: "Tag",
  definition(t) {
    t.int("id");
    t.nonNull.string("value");
  },
});
