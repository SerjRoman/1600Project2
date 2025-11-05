import { CategoryControllerContract } from "./category.types"
import { CategoryService } from "./category.service"; 

export const CategoryController: CategoryControllerContract = {
    async getAllCategories(request, response){
        try{
            let skip, take;
            if (request.query.skip){
                if (!isNaN(+request.query.skip)){
                    skip = +request.query.skip
                }
            }
            if (request.query.take){
                if (!isNaN(+request.query.take)){
                    take = +request.query.take
                }
            }
            response.status(200).json(await CategoryService.getAllCategories(take, skip))
        }
        catch(error){
            console.log(`Error!!!\n\n${error}`)
            response.status(500).json("Random error")
        }
    },
    async getCategoryById(request, response){
        try{
            let id = request.params.id
            if (isNaN(+id)){
                response.status(400).json("Bad ID - it is not a number!!!!")
                return
            }
            response.status(200).json(await CategoryService.getCategoryById(+id))
        }
        catch(error){
            console.log(`Error!!!\n\n${error}`)
            response.status(500).json("Random error")
        }
    },
    async createCategory(request, response){
        try{
            let body = request.body
            if (!body.name){
                response.status(400).json("Bad name for product!")
                return
            }
            response.status(201).json(await CategoryService.createCategory(body))
        }
        catch(error){
            console.log(`Error!!!\n\n${error}`)
            response.status(500).json("Random error")
        }
    },
    async deleteCategory(request, response){
        try{
            let id = request.params.id
            if (isNaN(+id)){
                response.status(400).json("Bad ID - it is not a number!!!!")
                return
            }
            response.status(200).json(await CategoryService.deleteCategory(+id))
        }
        catch(error){
            console.log(`Error!!!\n\n${error}`)
            response.status(500).json("Random error")
        }
    }
}