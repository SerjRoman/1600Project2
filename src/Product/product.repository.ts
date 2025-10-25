import { PrismaClient } from "../client/prisma-client";
import { Prisma } from "../generated/prisma";
import { ProductRepositoryContract } from "./product.types";


export const ProductRepository: ProductRepositoryContract = {
    getProducts: async (take) =>{
        try {
            // Если возникает ошибка с take: undefined. В TSConfig.json ставим exactOptionalPropertyTypes: false
            const products = await PrismaClient.product.findMany({
                take: take
            })
            return products
            
        } catch(error){
            console.log(error)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    console.log('Failed to create relation between Product and Category')
                    throw new Error("Failed to create relation between Product and Category")
                }
            }
            throw error
        }
    },
    createProduct: async (data) =>{
        return await PrismaClient.product.create({
            data
        })
    },

    updateProduct: async(id, data) => {
       return await PrismaClient.product.update({
            where: {id},
            data: data
        })
    },
    getProductById(id) {
        return PrismaClient.product.findUnique({
            where: {
                id
            }
        })
    },
}