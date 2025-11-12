import { Request, Response } from 'express'
import { Prisma } from '../generated/prisma'
import { ErrorResponse } from '../genericTypes/error.types'
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
        req: Request<void, Product[] | ErrorResponse, void, { take?: string }>,
        res: Response<Product[] | ErrorResponse>
    ) => void
    getProductById: (
        req: Request<{ id: string }, Product | ErrorResponse, object>,
        res: Response<Product | ErrorResponse>
    ) => void
    createProduct: (
        req: Request<object, string | ErrorResponse, ProductCreate>,
        res: Response<string | ErrorResponse>
    ) => Promise<void>
    updateProduct: (
        req: Request<{ id: string }, string | ErrorResponse, ProductUpdate>,
        res: Response<string | ErrorResponse>
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