import {Router} from "express" 
import { CategoryController } from "./category.controller";

export const CategoryRouter = Router();

CategoryRouter.get('/categories', CategoryController.getAllCategories)
CategoryRouter.get('/categories/:id', CategoryController.getCategoryById)
CategoryRouter.post('/categories', CategoryController.createCategory)
CategoryRouter.delete('/categories/:id', CategoryController.deleteCategory)