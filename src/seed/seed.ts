
// PrismaClient

import { Prisma, PrismaClient } from "../generated/prisma";


// CRUD - Create Read Update Delete



const client = new PrismaClient()

async function createCategory() {
    try {
        const category = await client.category.create({
            // Параметр data - отвечает за передачу данных (для создания/обновления)
            data: {
                name: "Mice"
            }
        })
        console.log(category)
    } catch (error) {
        console.log(error);
    }
}
// createCategory()


async function createProduct() {
    const product = await client.product.create({
        data: {
            name: "Mirror 2",
            price: 10,
            categoryId: 8 // Unchecked
            // category: {
            //     // connect - подключает к существующей сущности
            //     // connect: {
            //     //     name: "Laptops"
            //     // }
            //     // create - создает новую сущность И создает связь
            //     // create: {
            //     //     name: "Cups"
            //     // },
            //     connectOrCreate: {
            //         where: {
            //             name: "Mirrors"
            //         },
            //         create: {
            //             name: "Mirrors"
            //         }
            //     }
            // },
        }
    })
    console.log(product)
}
// createProduct()

async function getCategory() {
    const category = await client.category.findUnique({
        // Параметр where - используется для фильтрации(поиска)
        where: {
            name: "Mirrors"
        },
        // Параметр include - используется для получения данных о связи
        include: {
            products: true,
        }
    })
    console.log(category)
}
// getCategory()
async function getProduct() {
    const product = await client.product.findUnique({
        // Параметр where - используется для фильтрации(поиска)
        where: {
            id: 12
        },
        // Параметр include - используется для получения данных о связи
        // include: {
        //     category: true
        // },
        // // Параметр omit - позволяет указать, какие поля ИСКЛЮЧИТЬ из получаемых данных
        // omit: {
        //     categoryId: true,
        //     id: true,
        // }
        // Параметр select - используется для получения конкретных полей из сущности
        // select: {
        //     id: true,
        //     // category: {
        //     //     select: {
        //     //         name: true
        //     //     }
        //     // }
        // }
    })
    console.log(product)
}
getProduct()

async function getCategories() {
    const categories = await client.category.findMany({
        // include: {
        //     products: true
        // }
        // skip: 1,
        // take: 2
        where: {
        },
        orderBy: {
            
        }
    })
    console.log(categories)
}
// getCategories()

async function deleteCategory() {
    const category = await client.category.delete({
        where: {
            id: 2
        }
    })
    console.log(category)
}
// deleteCategory()
async function deleteCategories() {
    const categories = await client.category.deleteMany({
    })
    console.log(categories)
}
// deleteCategories()
async function updateCategory() {
    const categories = await client.category.update({
        where: {
            id: 6
        },
        data: {
            name: "Wires"
        }
    })
    console.log(categories)
}
// updateCategory()

async function createManyCategories() {
    const categories = await client.category.createMany({
        data: [
            {
                name: "Humans"
            },
            {
                name: "Cucumbers"
            },
            {
                name: "Keyboards"
            },
        ]
    })
    console.log(categories)
}
//                    ModelGetPayload
type Category = Prisma.CategoryGetPayload<{
    // include: {
    //     products: true
    // }
}>
//                          
type ProductUncheckedCreateInput = Prisma.ProductUncheckedCreateInput
type ProductCreateInput = Prisma.ProductWhereUniqueInput


// 1. Создать функцию для создания продукта с созданием категории в одном запросе
// 2. Создать функцию, которая берет первые 15 сущностей продукта, каждый объект имеет ТОЛЬКО id
// 3. Создать функицю, которая выводит всю информацию о продукте с учетом ее связи с категорией
// 4. Создать функцию для обновления цены продукта по его ID
// 5. Создать функцию для получения всех продуктов из определенной категории (по названию категории)
// 6. Создать функцию для удаления продукта по его ID
// 7. Создать функцию для перемещения продукта в другую категорию
// 8. Создать функцию, которая применяет 10% скидку ко всем продуктам в указанной категории
