import { UserServiceContract } from "./user.types"
import { UserRepository } from "./user.repository"
import { sign } from "jsonwebtoken"
import { ENV } from "../config/env"
import { StringValue } from 'ms'
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
        // 1 параметр - данные, которые нужно записать в токен в виде объекта.
        // 2 параметр - sikcret key
        // 3 параметр - options, хедеры. expiresIn - это время life токена.

        //  Type Assertion (Утверждение типа) — это способ сказать компилятору TypeScript: 
        //  "Эй, я, разработчик, знаю лучше тебя. Я уверен, что тип этого значения — вот такой".  

        const token = sign({ id: user.id }, ENV.JWT_ACCESS_SECRET_KEY, { expiresIn: ENV.JWT_EXPIRES_IN as StringValue })

        // sign(payload: string | object | Buffer<ArrayBufferLike>, 
        // secretOrPrivateKey: Secret | PrivateKey, 
        // options?: SignOptions): string (+4 overloads)

        return token
    },
    async register(credentials) {
        const user = await UserRepository.getUserByEmail(credentials.email)
        if (user) {
            throw new Error(`USER_EXISTS`)
        }
        const newUser = await UserRepository.createUser(credentials)
        const token = sign({ id: newUser.id }, ENV.JWT_ACCESS_SECRET_KEY, { expiresIn: ENV.JWT_EXPIRES_IN as StringValue })
        return token
    },
    async me(userId){
        const user = await UserRepository.getUserWithoutPasswordById(userId)

        if (!user) {
            throw new Error('NOT_FOUND')
        }
        return user
    }

}