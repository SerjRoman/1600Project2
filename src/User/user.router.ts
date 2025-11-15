import { Router } from "express"
import { UserController } from "./user.controller"
import { authMiddleware } from "../middlewares/auth.middleware";

export const UserRouter = Router();
// me-Get
// login - Post
// register - Post
UserRouter.get('/me', authMiddleware, UserController.me)
UserRouter.post('/login', UserController.login)
UserRouter.post('/register', UserController.register)
