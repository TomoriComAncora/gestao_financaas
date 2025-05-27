import { Router } from "express";

//controllers
//user
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

//transaction
import { CreateTransactionController } from "./controllers/transaction/CreateTransactionController";
import { ListTransactionController } from "./controllers/transaction/ListTransactionController";
import { UpdateTransactionController } from "./controllers/transaction/UpdateTransactionController";
import { DeleteTransactionController } from "./controllers/transaction/DeleteTransactionController";

//Middlewares
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();
//criar usuario
router.post("/users", new CreateUserController().handle);

//logar usuario
router.post("/session", new AuthUserController().handle);

//detalhes do usuario
router.get("/me", isAuthenticated, new DetailUserController().handle);

//criando transacao
router.post(
  "/transaction",
  isAuthenticated,
  new CreateTransactionController().handle
);

//listando transacoes
router.get(
  "/transaction",
  isAuthenticated,
  new ListTransactionController().handle
);

//Editar transacoes
router.put("/transaction/edit", isAuthenticated, new UpdateTransactionController().handle);

//Deletar transacoes
router.delete(
  "/transaction",
  isAuthenticated,
  new DeleteTransactionController().handle
);

export { router };
