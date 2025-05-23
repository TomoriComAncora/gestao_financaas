import prismaClient from "../../prisma";

type TransactionTypes = "entrada" | "saida";

interface TrasactionRequest {
  name: string;
  value: number;
  type: TransactionTypes;
  description?: string;
  date: Date;
}

class CreateTransactionService {
  async execute(
    { name, value, type, description, date }: TrasactionRequest,
    userId:string
  ) {
    if (name === "") {
      throw new Error("Name invalid");
    }

    if (value === undefined || value <= 0) {
      throw new Error("Value invalid");
    }

    if (type !== "entrada" && type !== "saida") {
      throw new Error("Type trasaction invalid");
    }

    //Buscando usuario para ver o saldo atual
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    let newBalance = user.balance;
    if (type === "entrada") {
      newBalance += value;
    } else if (type === "saida") {
      newBalance -= value;
    }

    //validar e converter a data
    let transactionDate: Date;
    if (typeof date === "string") {
      transactionDate = new Date(date);
      if (isNaN(transactionDate.getTime())) {
        throw new Error("Invalid date format");
      }
    } else if (date instanceof Date) {
      transactionDate = date;
    } else {
      throw new Error("Invalid date");
    }

    const transaction = await prismaClient.transaction.create({
      data: {
        name: name,
        value: value,
        type: type,
        description: description,
        date: transactionDate,
        userId,
      },
      select:{
        id: true,
        name: true,
        value: true,
        type: true,
        description: true,
        date: true,
        userId: true
      }
    });

    //atualizar o saldo
    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: newBalance,
      },
    });

    return transaction;
  }
}

export { CreateTransactionService };
