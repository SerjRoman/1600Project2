import { CategoryServiceContract } from "./category.types";
import { CategoryRepository } from "./category.repository";


export const CategoryService: CategoryServiceContract = {
    getAllCategories: (take, skip) => {
        return CategoryRepository.getAllCategories(take, skip)
    },
    getCategoryById: (id) => {
        return CategoryRepository.getCategoryById(id)
    },

    createCategory: (data) => {
        return CategoryRepository.createCategory(data)
    },

    deleteCategory: (id) => {
        return CategoryRepository.deleteCategory(id)
    }
}




