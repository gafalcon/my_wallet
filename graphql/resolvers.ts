import { Context } from "./context";

export const resolvers = {
  Query: {
    getBanks: async (root, args, { prisma }: Context) => {
      return await prisma.bank.findMany();
    },
    getBank: async (_, { name }: { name: string }, { prisma }: Context) => {
      return await prisma.bank.findUnique({ where: { name } });
    },
  },
};
