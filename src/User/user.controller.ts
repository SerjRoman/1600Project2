import { UserControllerContract } from "./user.types"
import { UserService } from "./user.service"
import { TokenExpiredError, verify } from "jsonwebtoken"
import { ENV } from "../config/env"

// USER_EXISTS -> пользователь существует
// NOT_FOUND -> Не найден(пользователь). 404 HTTP STATUS CODE
// WRONG_CREDENTIALS -> неправильные данные для входа 

export const UserController: UserControllerContract = {
    async login(req, res) {
        try {
            const data = req.body
            const user = await UserService.login(data)
            res.status(200).json({ token: user })
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                if (error.message === 'NOT_FOUND') {
                    res.status(404).json({ message: "User with this email does not exist!" })
                    return
                } else if (error.message === 'WRONG_CREDENTIALS') {
                    res.status(401).json({ message: "User with this email does not exist!" })
                    return
                }
                // switch (error.message) {
                //     case "NOT_FOUND":
                //         res.status(404).json("User with this email does not exist!")
                //         return;
                //     case "WRONG_CREDENTIALS":
                //         res.status(401).json("User with this email does not exist!")
                //         return
                //     default:
                //         res.status(500).json('Server error. Try again later')
                // }
            }
            res.status(500).json({ message: 'Server error. Try again later' })
        }
    },
    async register(request, response) {
        try {
            const data = request.body
            const newUser = await UserService.register(data)
            response.status(201).json({ token: newUser })
        }
        catch (error) {
            console.log(error)
            if (error instanceof Error) {
                if (error.message === 'USER_EXISTS') {
                    response.status(409).json({ message: "User with this email already exists!" })
                    return
                }
            }
            response.status(500).json({ message: 'Server error. Try again later' })
        }
    },
    async me(request, response) {
        try {
            response.status(200).json(await UserService.me(response.locals.userId))
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'NOT_FOUND') {
                    response.status(404).json({ message: "User not found!" })
                    return
                }
            }
            response.status(500).json({ message: 'Server error. Try again later' })

        }
    }
}
