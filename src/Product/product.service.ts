import path from "path"
import fs from "fs";
import fsPromises from "fs/promises";
import { Product, ProductServiceContract } from "./product.types";


// Отримуємо абсолютний шлях до json-файлу
const productsPath = path.join(__dirname, "products.json")
// Отримуємо дані з файлу у строковому форматі
// За допомогою JSON.parse конвертуємо дані з строки до типу js
const products: Product[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))


export const ProductService: ProductServiceContract = {
    getAllProducts: (take) => {
        if (take){
            return products.slice(0, take)
        };
        return products
    },
    getProductById: (id) => {
        const product = products.find((pr) => { 
            return pr.id === id
        });
        return product
    },
    createProduct: async (data) => {
        try {
            const newProduct = {...data, id: products.length + 1} // C
            products.push(newProduct) // Repo
            await fsPromises.writeFile(productsPath, JSON.stringify(products, null, 4)) // Repo
            return newProduct
        } catch (error) {
            console.log(error);
            return null
        }
    },
    // 1. Найти продукт по ID
    // 2. поменять его данные на основе data
    // 3. Сохранить в массив и в файл
    // 4. Вернуть результат
    updateProduct: async (id, data) => {
        const product = ProductService.getProductById(id)
        if (!product) return null;
        // {...{name, id, price, category}, ...{price, name}}
        // data -> {name: "", price: "", category: }
        // data -> {price: "", category: }
        // data -> {name: "", price: "", }
        // data -> {name: "" }
        // { ...{name: "Old product", id: 1}, ...{name: "New product"} }
        try {
            const updatedProduct = {...product, ...data}
            products.splice(id - 1, 1, updatedProduct)
            await fsPromises.writeFile(productsPath, JSON.stringify(products, null, 4))
            return updatedProduct
        } catch (error) {
            console.log(error)
            return null
        }
    }
};