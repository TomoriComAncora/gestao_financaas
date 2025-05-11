import { Router } from "express";

//controllers
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();
//criar usuario
router.post("/users", new CreateUserController().handle)

export {router}