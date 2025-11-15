// const express = require('express')
// const ProductRouter = require('./Product/product.router')

// Скачать типизацию express при ошибке(смотреть на "express")
import express from "express"
import { ProductRouter } from "./Product/product.router"
import { CategoryRouter } from "./Category/category.router"
import { UserRouter } from "./User/user.router"
import { logMiddleware } from "./middlewares/log.middleware"
import { authMiddleware } from "./middlewares/auth.middleware"

// npm i dotenv
// import { config} from 'dotenv';
// config()
// process.env

// Створюємо додаток express.
const app = express()

app.use(express.json())

app.use(logMiddleware)

app.use("/products/", ProductRouter)
app.use("/categories/", CategoryRouter)
app.use("/users/", UserRouter)

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
app.listen(PORT, HOST, () => {
    console.log("Server is running on http://localhost:8001")
})
