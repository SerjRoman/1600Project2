// const express = require('express')
// const ProductRouter = require('./Product/product.router')

// Скачать типизацию express при ошибке(смотреть на "express")
import express from "express"
import { ProductRouter } from "./Product/product.router"
import { CategoryRouter } from "./Category/category.router"


// Створюємо додаток express.
const app = express()

app.use(express.json())
app.use(ProductRouter)
app.use(CategoryRouter)
// Вказує на конкретний комп'ютер у мережі Інтернет.
const HOST = "localhost"
// Вказує на конкретний процес на вказаному хості.
// Порт можливий від 0 до 65535. 
const PORT = 8001

//req - запит(request), res - відповідь (response)
app.get('/', (req, res) => {
    console.log('New request')
    res.json('Hello world')
})
// Query 
// http://localhost:8000/products?take=5
   
// undefined, '56', 'jfksdh', 'true'
// с take - проверить, что take существует. Дальше проверить что не NaN. 
// без take - отдать все продукты

// Запускаємо сервер(Сервер починає слухати вказаний порт і хост.)
app.listen(PORT, HOST, ()=> {
    console.log("Server is running on http://localhost:8001")
})
