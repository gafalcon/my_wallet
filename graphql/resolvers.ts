import { Context } from "./context";

export const resolvers = {
  Query: {
    getBanks: async (root, args, { prisma }: Context) => {
      return await prisma.bank.findMany();
    },
    getBank: (_, { name }) => {
      return {
        id: 1,
        name,
      };
    },
  },
};
