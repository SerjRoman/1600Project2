const express = require('express')
// Створюємо додаток express.
const app = express()

// Вказує на конкретний комп'ютер у мережі Інтернет.
const HOST = "localhost"
// Вказує на конкретний процес на вказаному хості.
// Порт можливий від 0 до 65535. 
const PORT = 8001
//req - запит(request), res - відповідь(response)
app.get('/', (req, res) => {
    console.log('New request')
    res.json('Hello world')
})

// Запускаємо сервер(Сервер починає слухати вказаний порт і хост.)
app.listen(PORT, HOST, ()=> {
    console.log("Server is running on http://localhost:8001")
})