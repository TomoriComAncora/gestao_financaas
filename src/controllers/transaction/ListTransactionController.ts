import { Request, Response } from "express";
import { ListTransactionService } from "../../services/transaction/ListTransactionService";

class ListTransactionController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const listTransactionService = new ListTransactionService();

    const listTransaction = await listTransactionService.execute({ userId });

    return res.json(listTransaction);
  }
}

export { ListTransactionController };
