import {Router} from "express"
import { UserController } from "./user.controller"

export const UserRouter = Router();

// me-Get
// login - Post
// register - Post
UserRouter.get('/users/me', UserController.me)
UserRouter.post('/users/login', UserController.login)
UserRouter.post('/users/register', UserController.register)
