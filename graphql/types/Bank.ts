import { objectType, extendType } from "nexus";

export const Bank = objectType({
  name: "Bank",
  definition(t) {
    t.int("id");
    t.string("name");
  },
});
