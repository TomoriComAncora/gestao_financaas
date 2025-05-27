import prismaClient from "../../prisma";

interface TransactioRequest {
  transaction_id: string;
}

class DeleteTransactionService {
  async execute({ transaction_id }: TransactioRequest, userId: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id: transaction_id,
      },
    });

    if (!transaction) {
      throw new Error("Trasanction not found");
    }

    if (transaction.userId !== userId) {
      throw new Error("Not authorized");
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    let newBalance = user.balance;
    if (transaction.type === "entrada") {
      newBalance -= transaction.value;
    } else {
      newBalance += transaction.value;
    }

    await prismaClient.transaction.delete({
      where: {
        id: transaction_id,
      },
    });

    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: newBalance,
      },
    });

    return { message: "Transaction deleted successfully" };
  }
}

export { DeleteTransactionService };
