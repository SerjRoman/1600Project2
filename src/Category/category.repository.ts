import { CategoryRepositoryContract } from "./category.types";
import { Client } from '../client/prisma-client'


export const CategoryRepository: CategoryRepositoryContract = {
    async getAllCategories(take, skip){
        try {
             const categories= await Client.category.findMany({take, skip})

            return categories
            
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    
    async getCategoryById(id){
        try {
            return await Client.category.findUnique({
                where:{id}
            })
        } catch (error) {
            console.log(error)
            throw error
        }
        
      
        
    },
    
    async deleteCategory(id) {
        try{
            const deletedCategory = await Client.category.delete({where: {id}})
            return deletedCategory
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    async createCategory(data){
        try {
            const createCategory = await Client.category.create({data})
            return createCategory
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

