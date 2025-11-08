import { UserControllerContract } from "./user.types"
import { UserService } from "./user.service"

// USER_EXISTS -> пользователь существует
// NOT_FOUND -> Не найден(пользователь). 404 HTTP STATUS CODE
// WRONG_CREDENTIALS -> неправильные данные для входа 

export const UserController: UserControllerContract = {
    async login(req, res) {
        try {
            const data = req.body
            const user = await UserService.login(data)
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                if (error.message === 'NOT_FOUND') {
                    res.status(404).json("User with this email does not exist!")
                    return
                } else if (error.message === 'WRONG_CREDENTIALS') {
                    res.status(401).json("User with this email does not exist!")
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
            res.status(500).json('Server error. Try again later')
        }
    },
    async register(request, response) {
        try {
            const data = request.body
            const newUser = await UserService.register(data)
            response.status(201).json(newUser)
        }
        catch (error) {
            console.log(error)
            if (error instanceof Error) {
                if (error.message === 'USER_EXISTS') {
                    response.status(409).json("User with this email already exists!")
                    return
                }
            }
            response.status(500).json('Server error. Try again later')
        }
    }
}