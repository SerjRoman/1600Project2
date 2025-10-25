import { Request, Response } from 'express'
import { Prisma } from '../generated/prisma'
// ModelGetPayload
// В ModelGetPayload можно передать параметры: select, omit, include
export type Product = Prisma.ProductGetPayload<{}>

export type ProductCreate = Prisma.ProductUncheckedCreateInput
// Unchecked - {categoryId: number} | 
// {Model}Unchecked{Create | Update}Input
// Checked(без Unchecked) - { category: { connect: { id: categoryId } } }
export type ProductUpdate = Prisma.ProductUncheckedUpdateInput

export interface ProductServiceContract {
    getAllProducts: (take?: number) => Promise<Product[]>
    getProductById: (id: number) => Promise<Product | null>
    createProduct: (data: ProductCreate) => Promise<Product | null>
    updateProduct: (id: number, data: ProductUpdate) => Promise<Product | null>
}
// getAllProducts, 
export interface ProductRepositoryContract {
    getProducts: (take?: number) => Promise<Product[]>
    getProductById: (id: number) => Promise<Product | null>
    createProduct: (data:ProductCreate) => Promise<Product>
    updateProduct: (id:number, data: ProductUpdate) => Promise<Product>
}

export interface ProductControllerContract {
    getAllProducts: (
        req: Request<void, Product[] | string, void, { take?: string }>,
        res: Response<Product[] | string>
    ) => void
    getProductById: (
        req: Request<{ id: string }, Product | string, object>,
        res: Response<Product | string>
    ) => void
    createProduct: (
        req: Request<object, string, ProductCreate>,
        res: Response<string>
    ) => Promise<void>
    updateProduct: (
        req: Request<{ id: string }, string, ProductUpdate>,
        res: Response<string>
    ) => Promise<void>
}


// Request<P, ResBody, ReqBody, ReqQuery, Locals>
// P - Динамические параметры запроса (то, что хранится в req.params)
// ResBody - то, что будет в ответе (в res.json)
// ReqBody - то, что будет в теле запроса (в req.body)
// ReqQuery - то, что будет в query параметрах (  req.query)
// 
// Response<ResBody, Locals>
// ResBody - то, что будет в ответе (в res.json)
// 