import { Client } from "../client/prisma-client"
import { UserRepositoryContract } from "./user.types"

export const UserRepository: UserRepositoryContract = {
    async getUserByEmail(email) {
        try {
            return await Client.user.findUnique({
                where: { email }
            })
        } catch (error) {
            console.log(error)
            throw error
            
        }
    },
    async createUser(userData) {
        try {
            return await Client.user.create({
                data: userData
            })
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }
}