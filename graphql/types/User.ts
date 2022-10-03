import { objectType, extendType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("email");
    t.float("total_amount");
  },
});
