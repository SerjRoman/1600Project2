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
