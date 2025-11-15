import {Router} from "express" 
import { CategoryController } from "./category.controller";

export const CategoryRouter = Router();

CategoryRouter.get('/', CategoryController.getAllCategories)
CategoryRouter.get('/:id', CategoryController.getCategoryById)
CategoryRouter.post('/', CategoryController.createCategory)
CategoryRouter.delete('/:id', CategoryController.deleteCategory)