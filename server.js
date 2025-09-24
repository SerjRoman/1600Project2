const express = require('express')
// Створюємо додаток express.
const app = express()

const path = require('path')
const fs = require('fs')
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

app.get('/products', (req, res) => {
    res.status(200).json(products)
})

// Для того, щоб використовувати динамічний параметр в express
// у посиланні ми вказуємо ":" і назву параметру.
app.get('/products/:id', (req, res) => {
    console.log(req.params)
    // +"fdhasjdsa" -> NaN
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

// Запускаємо сервер(Сервер починає слухати вказаний порт і хост.)
app.listen(PORT, HOST, ()=> {
    console.log("Server is running on http://localhost:8001")
})
