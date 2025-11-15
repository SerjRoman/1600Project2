/*

Router(Роутер) - получает запросы и указывает какой контроллер должен обработать запрос

Controller (Контроллер) - обрабатывает запрос, получает данные из сервиса и составляет ответ
Service (Сервис) - реализует бизнес логику приложения(то есть, выполняет задачи приложения)
Repository (Репозиторий) - предоставляет доступ по работе с данными


src - source code - исходный код
*/

// const express = require('express');
// const ProductController = require('./product.controller');

import {Router} from "express" 
import { ProductController } from "./product.controller";

export const ProductRouter = Router();
// Router
// C - Controller
// S - Service
// R (repo) - Repository
ProductRouter.get('/', ProductController.getAllProducts)

// Для того, щоб використовувати динамічний параметр в express
// у посиланні ми вказуємо ":" і назву параметру.
ProductRouter.get('/:id', ProductController.getProductById)

ProductRouter.post('/', ProductController.createProduct)
// PUT | PATCH
ProductRouter.patch('/:id', ProductController.updateProduct)

// export {ProductRouter};