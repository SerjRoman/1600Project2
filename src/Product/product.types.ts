import { Request, Response } from 'express'

export interface Product {
    id: number
    name: string
    price: number
    category: string
}

export type ProductCreate = Omit<Product, "id">

export type ProductUpdate = Partial<Omit<Product, "id">>

export interface ProductServiceContract {
    getAllProducts: (take?: number) => Product[]
    getProductById: (id: number) => Product | undefined
    createProduct: (data: ProductCreate) => Promise<Product | null>
    updateProduct: (id: number, data: ProductUpdate) => Promise<Product | null>
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
export interface ProductControllerContract {
    getAllProducts: (req: Request<void, Product[] | string, void, { take?: string }>, res: Response<Product[] | string>) => void
    getProductById: (req: Request<{id : string}, string, void, { take?: any }>, res: Request <string>) => void // Artem
    createProduct: (req: Request<null, ProductCreate[] | string, void {}>, res: Response) => Promise<void> // Kirill
    updateProduct: (req: Request<{id: number}, ProductUpdate | >, res: Response) => Promise<void> // Gleb
}