const express = require('express')
// Створюємо додаток express.
const app = express()

app.use(express.json())

const path = require('path')
const fs = require('fs')
const fsPromises = require('fs/promises')
// Вказує на конкретний комп'ютер у мережі Інтернет.
const HOST = "localhost"
// Вказує на конкретний процес на вказаному хості.
// Порт можливий від 0 до 65535. 
const PORT = 8001
// Отримуємо абсолютний шлях до json-файлу
const productsPath = path.join(__dirname, "products.json")
// Отримуємо дані з файлу у строковому форматі
// За допомогою JSON.parse конвертуємо дані з строки до типу js
const products = JSON.parse(fs.readFileSync(productsPath, 'UTF-8'))

//req - запит(request), res - відповідь (response)
app.get('/', (req, res) => {
    console.log('New request')
    res.json('Hello world')
})
// Query 
// http://localhost:8000/products?take=5
   
// undefined, '56', 'jfksdh', 'true'
// с take - проверить, что take существует. Дальше проверить что не NaN. 
//без take - отдать все продукты
app.get('/products', (req, res) => {
    const take = req.query.take
    console.log(take)
    if (!take){
        res.status(200).json(products)
        return
    }
    if(isNaN(+take)){
        res.status(400).json("Take must be an Integer")
        return
    }
    const slicedProducts = products.slice(0, +take)


    res.status(200).json(slicedProducts)
})

// Для того, щоб використовувати динамічний параметр в express
// у посиланні ми вказуємо ":" і назву параметру.
app.get('/products/:id', (req, res) => {
    console.log(req.params)
    const id = +req.params.id
    if (isNaN(id)){
        res.status(400).json("Id must be an Integer")
        return;
    }
    const product = products.find((pr) => { 
        return pr.id === id
    }) 
    if (!product) {
        res.status(404).json("Product not found")
        return
    }
    res.status(200).json(product)
})

app.post('/products', async (req, res) =>{
    console.log(req.body)
    const body = req.body
    if(!body){
        res.status(422).json('Body is required!')
        return
    }
    const newProduct = {...body, id: products.length + 1}
    if(!newProduct.name){
        res.status(422).json('Name is required!')
        return
    }
    if(!newProduct.price){
        res.status(422).json('Price is required!')
        return
    }
    if(!newProduct.category){
        res.status(422).json('Category is required!')
        return
    }
    try {
        products.push(newProduct)
        await fsPromises.writeFile(productsPath, JSON.stringify(products, null, 4))
        res.status(201).json('Successfully created')
    } catch (error) {
        console.log(error)
        res.status(500).json("Product creation failed")
    }
})
// Запускаємо сервер(Сервер починає слухати вказаний порт і хост.)
app.listen(PORT, HOST, ()=> {
    console.log("Server is running on http://localhost:8001")
})
