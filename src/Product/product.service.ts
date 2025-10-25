import { ProductRepository } from "./product.repository";
import { ProductServiceContract } from "./product.types";

export const ProductService: ProductServiceContract = {
    getAllProducts: (take) => {
        return ProductRepository.getProducts(take)
    },
    getProductById: (id) => {
        return ProductRepository.getProductById(id)
    },
    createProduct: async (data) => {
        return ProductRepository.createProduct(data)
    },
    updateProduct: async (id, data) => {
        return ProductRepository.updateProduct(id, data)
    }
};