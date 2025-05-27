import { Request, Response } from "express";
import { DeleteTransactionService } from "../../services/transaction/DeleteTransactionService";

class DeleteTransactionController {
  async handle(req: Request, res: Response) {
    const transaction_id = req.query.transaction_id as string;
    const user_id = req.user_id;

    const deleteTransactionService = new DeleteTransactionService();

    const transaction = await deleteTransactionService.execute(
      { transaction_id },
      user_id
    );

    return res.json(transaction);
  }
}

export { DeleteTransactionController };
