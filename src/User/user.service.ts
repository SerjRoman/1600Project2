import { UserServiceContract } from "./user.types"
import { UserRepository } from "./user.repository"
import { sign } from "jsonwebtoken"
import { ENV } from "../config/env"
import { StringValue } from 'ms'
import { compare, hash } from "bcryptjs"
// USER_EXISTS -> пользователь существует
// NOT_FOUND -> Не найден(пользователь). 404 HTTP STATUS CODE
// WRONG_CREDENTIALS -> неправильные данные для входа 

export const UserService: UserServiceContract = {
    async login(credentials) {
        const user = await UserRepository.getUserByEmail(credentials.email)

        if (!user) {
            throw new Error('NOT_FOUND')
        }
        // Функция `compare` асинхронная, так как процесс сравнения требует вычислительных ресурсов
		// и может занять некоторое время. Она берет пароль в открытом виде, "солит" его
		// (используя соль, сохраненную внутри хеша user.password) и хеширует.
		// Затем она сравнивает полученный хеш с тем, что хранится в базе.
        const isMatch = await compare(credentials.password, user.password)
        if (!isMatch) {
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
        // Хеширование - процесс шифрования данных(с помощью какого то алгоритма), чаще всего без обратного процесса
        // Полученный хеш (hashedPassword) — это не просто зашифрованная строка.
		// Он имеет специальную структуру, которая включает в себя всю необходимую
		// информацию для будущей проверки пароля.
		//
		// Примерный вид хеша для пароля "my_password123":
		// $2b$10$fA9.oqm3.sI9K.Y4C9kKKeu/4s5G3f.6Y4fH.2o1E7m2B8vC9kKKe
		//
		// Он состоит из нескольких частей, разделенных символом "$":
		// 1. `$2b` - Идентификатор алгоритма bcrypt.
		// 2. `$10` - "Стоимость" или сложность хеширования (то самое число, что мы передали в функцию `hash`).
		// 3. `$fA9.oqm3.sI9K.Y4C9kKKe` - Это "соль" (salt). Случайная строка, которая генерируется
		//    для каждого пароля индивидуально. Она добавляется к паролю перед хешем.
		//    Благодаря соли, даже два одинаковых пароля будут иметь совершенно разные хеши.
		// 4. `u/4s5G3f.6Y4fH.2o1E7m2B8vC9kKKe` - Это непосредственно результат хеширования
		//    пароля вместе с солью.
		//
        

        const hashedPassword = await hash(credentials.password, 10)

        const hashedCredentials = {
            ...credentials,
            password: hashedPassword
        }
        const newUser = await UserRepository.createUser(hashedCredentials)
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