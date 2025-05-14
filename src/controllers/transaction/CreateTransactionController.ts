import { Request, Response } from "express";
import { CreateTransactionService } from "../../services/transaction/CreateTransactionService";

class CreateTransactionController {
  async handle(req: Request, res: Response) {

    const {name, value, type, description, date} = req.body;
    const user_id = req.user_id;

    const createTransactionService = new CreateTransactionService();

    const transaction = await createTransactionService.execute({
        name, value, type, description, date
    }, user_id);

    return res.json(transaction);
  }
}

export { CreateTransactionController };
