import { Router } from "express";

//controllers
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

//Middlewares
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();
//criar usuario
router.post("/users", new CreateUserController().handle);

//logar usuario
router.post("/session", new AuthUserController().handle);

//detalhes do usuario
router.get("/me", isAuthenticated, new DetailUserController().handle);

export { router };
