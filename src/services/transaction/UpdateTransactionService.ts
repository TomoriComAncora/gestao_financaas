import prismaClient from "../../prisma";

type TransactionTypes = "entrada" | "saida";

interface TransactionRequest {
  id: string;
  name?: string;
  value?: number;
  type?: TransactionTypes;
  description?: string;
  date?: string | Date | null;
}

class UpdateTransactionService {
  async execute(
    { id, name, value, type, description, date }: TransactionRequest,
    userId: string
  ) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    if (transaction.userId !== userId) {
      throw new Error("Not authorized");
    }

    if (value <= 0) {
      throw new Error("Value invalid");
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    // console.log("id passado:", id, "id do usuario: ", user.id);

    if (!user) {
      throw new Error("User not found");
    }

    //Reverter efeito antigo
    let newBalance = user.balance;
    if (transaction.type === "entrada") {
      newBalance -= transaction.value;
    } else {
      newBalance += transaction.value;
    }

    //Aplicar efeito novo
    const newType = type ?? transaction.type;
    const newValue = value ?? transaction.value;
    if (newType === "entrada") {
      newBalance += newValue;
    } else {
      newBalance -= newValue;
    }

    //validar e converter a data
    console.log("Valor recebido em date:", date, "Tipo:", typeof date);
    let transactionDate: Date;
    if (
      date === undefined ||
      date === null ||
      (typeof date === "string" && date.trim() === "")
    ) {
      transactionDate = transaction.date;
    } else if (typeof date === "string") {
      transactionDate = new Date(date);
      if (isNaN(transactionDate.getTime())) {
        throw new Error("Invalid date format");
      }
    } else if (date instanceof Date) {
      transactionDate = date;
    } else {
      throw new Error("Invalid date");
    }

    const updateTransaction = await prismaClient.transaction.update({
      where: { id },
      data: {
        name: name ?? transaction.name,
        value: newValue,
        type: newType,
        description: description ?? transaction.description,
        date: transactionDate ?? transaction.date,
      },
    });

    await prismaClient.user.update({
      where: { id: userId },
      data: { balance: newBalance },
    });

    return updateTransaction;
  }
}

export { UpdateTransactionService };
