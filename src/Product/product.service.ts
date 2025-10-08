import path from "path"
import fs from "fs";
import fsPromises from "fs/promises";


// Отримуємо абсолютний шлях до json-файлу
const productsPath = path.join(__dirname, "products.json")
// Отримуємо дані з файлу у строковому форматі
// За допомогою JSON.parse конвертуємо дані з строки до типу js
const products: {id: number, name: string, price: number, category: string}[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))


export const ProductService = {
    getAllProducts: (take?: number) => {
        if (take){
            return products.slice(0, take)
        };
        return products
    },
    getProductById: (id: number) => {
        const product = products.find((pr) => { 
            return pr.id === id
        });
        return product
    },
    createProduct: async (data: {name: string, price: number, category: string}) => {
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
};