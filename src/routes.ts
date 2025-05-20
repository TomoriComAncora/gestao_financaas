import { Router } from "express";

//controllers
//user
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

//transaction
import { CreateTransactionController } from "./controllers/transaction/CreateTransactionController";
import { ListTransactionController } from "./controllers/transaction/ListTransactionController";

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

export { router };
