const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

// Отримуємо абсолютний шлях до json-файлу
const productsPath = path.join(__dirname, "products.json")
// Отримуємо дані з файлу у строковому форматі
// За допомогою JSON.parse конвертуємо дані з строки до типу js
const products = JSON.parse(fs.readFileSync(productsPath, 'UTF-8'))


const ProductService = {
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
};


module.exports = ProductService;