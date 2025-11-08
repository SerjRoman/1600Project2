import { UserServiceContract } from "./user.types"
import { UserRepository } from "./user.repository"

// USER_EXISTS -> пользователь существует
// NOT_FOUND -> Не найден(пользователь). 404 HTTP STATUS CODE
// WRONG_CREDENTIALS -> неправильные данные для входа 

export const UserService: UserServiceContract = {
    async login(credentials) {
        const user = await UserRepository.getUserByEmail(credentials.email)

        if (!user) {
            throw new Error('NOT_FOUND')
        }
        if (user.password != credentials.password) {
            throw new Error('WRONG_CREDENTIALS')
        }
        
        const { password, ...userWithoutPassword } = user
        // const { password, id, username, avatar, email } = user
        // const userWithoutPassword = {
        //     id,
        //     username,
        //     avatar,
        //     email
        // }
        return userWithoutPassword
    },
    async register(credentials) {
        const user = await UserRepository.getUserByEmail(credentials.email)
        if (user) {
            throw new Error(`USER_EXISTS`)
        }
        const newUser = await UserRepository.createUser(credentials)
        const {password, ...userWithoutPassword} = newUser
        return userWithoutPassword
    }
}