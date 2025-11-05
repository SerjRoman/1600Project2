
// Endpoint:
// 1. Получить все категории
// 2. Получить категорию по ID
// 3. Создать категорию
// 4. Удалить категорию

// Team 1 - Controller + Router
// Team 2 - Service
// Team 3 - Repository

import { Prisma } from "../generated/prisma";
import { Request, Response } from "express";


// Тип самой категории
// Тип для описания данных для создания категории
// 


// Quick fix menu - Command(CTRL) + .
type Category = Prisma.CategoryGetPayload<{}>

type CategoryCreate = Prisma.CategoryUncheckedCreateInput


export interface CategoryServiceContract {
    getAllCategories: (take?: number, skip?: number) => Promise<Category[]>
    getCategoryById: (id: number) => Promise<Category | null>
    createCategory: (data: CategoryCreate) => Promise<Category>
    deleteCategory: (id: number) => Promise<Category>
}

export interface CategoryControllerContract {
    getAllCategories(request: Request<object, Category[] | string, object, {take?: string, skip?: string}>, response: Response<Category[] | string>): Promise<void>
    getCategoryById(request: Request<{id: string}, Category | string>, response: Response<Category | string>): Promise<void>
    createCategory(request: Request<object, Category | string, CategoryCreate>, response: Response<Category | string>): Promise<void>
    deleteCategory(request: Request<{id: string}, Category | string>, response: Response<Category | string>): Promise<void>
}

export interface CategoryRepositoryContract {
    getAllCategories: (take?: number, skip?: number) => Promise<Category[]>
    getCategoryById: (id: number) => Promise<Category | null>
    createCategory: (data: CategoryCreate) => Promise< Category> 
    deleteCategory: (id: number) => Promise<Category>
}