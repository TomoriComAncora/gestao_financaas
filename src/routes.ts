import { Router } from "express";

//controllers
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

const router = Router();
//criar usuario
router.post("/users", new CreateUserController().handle);

//logar usuario
router.post("/session", new AuthUserController().handle);

export { router };
