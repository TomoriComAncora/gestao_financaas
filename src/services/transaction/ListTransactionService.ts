import prismaClient from "../../prisma";

class ListTransactionService {
  async execute({ userId }) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const listTransaction = prismaClient.transaction.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        value: true,
      },
    });

    return listTransaction;
  }
}

export { ListTransactionService };
