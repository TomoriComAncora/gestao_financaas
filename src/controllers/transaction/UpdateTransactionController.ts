import { Request, Response } from "express";
import { UpdateTransactionService } from "../../services/transaction/UpdateTransactionService";

class UpdateTransactionController {
  async handle(req: Request, res: Response) {
    // console.log("Chegou aqui")
    const { id, name, value, type, description, date } = req.body;
    const user_id = req.user_id;

    const updateTransactionService = new UpdateTransactionService();

    const transaction = await updateTransactionService.execute(
      {
        id,
        name,
        value,
        type,
        description,
        date,
      },
      user_id
    );

    return res.json(transaction);
  }
}

export { UpdateTransactionController };
