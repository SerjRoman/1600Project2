/*

Router(Роутер) - получает запросы и указывает какой контроллер должен обработать запрос

Controller (Контроллер) - обрабатывает запрос, получает данные из сервиса и составляет ответ
Service (Сервис) - реализует бизнес логику приложения(то есть, выполняет задачи приложения)
Repository (Репозиторий) - предоставляет доступ по работе с данными


src - source code - исходный код
*/

const express = require('express');
const ProductController = require('./product.controller');

const ProductRouter = express.Router();
// Router
// C - Controller
// S - Service
// R (repo) - Repository
ProductRouter.get('/products', ProductController.getAllProducts)

// Для того, щоб використовувати динамічний параметр в express
// у посиланні ми вказуємо ":" і назву параметру.
ProductRouter.get('/products/:id', ProductController.getProductById)

ProductRouter.post('/products', ProductController.createProduct)

module.exports = ProductRouter;