// fulfilled | rejected | pending

// Promise
// const promise = new Promise(function(resolve, reject) {
//     setTimeout(() => {
//        console.log('5 seconds passed') 
//        resolve({
//             name: "Danil",
//             price: "50 грн",
//        })
//     }, 5000);
// })
// // 
// promise.then( (data) => {
//     console.log(data.name)
// })

function getUser(){
    return new Promise(function(resolve) {
        setTimeout(() => {
            resolve({
                name: "Danil",
                price: "50 грн",
            })
        }, 2000);
    })
}
function updateUser(user){
    return new Promise(function(resolve) {
        setTimeout(() => {
            resolve({
                ...user,
                name: "Updated " + user.name
            })
        }, 2000);
    })
}
// const user = getUser().then( (data) => {
//     updateUser(data).then( (data) => {
//         console.log(data)
//     }).catch( err => {
//         console.log(err)
//     })
// }).catch( (err) => {
//     console.log(err)
// console.log(user)
// });

// then - это метод который принимает callback, в этот callback можно принять 
// данные, если promise их передает

// function handler(req,res ) {
//     const user = getUser().then( (data) => {
//         return data
//     });
//     // user.then((data) => {
//     //     console.log(data)
//     // })
//     if (user.name) {

//     }
// }

// const fs = require("fs")

// const fs = require("fs")
// const fs = require("fs")
// const fs = require("fs")

// const fs = require("fs")
// const fs = require("fs")
// const fsPromises = require("fs/promises")

const fsPromises = require("fs/promises")

async function createUser(){
    try {
        const user = {
            name: "Danil",
            price: "50 грн",
        }
        console.log(1)
        await fsPromises.writeFile("./user.json", JSON.stringify(user))
        const newUser = JSON.parse( await fsPromises.readFile("./user1.json"))
        console.log(newUser)
        console.log(2)
    } catch (error) {
        console.log(error)
    }
}
createUser()
// 
// async - делает функцию асинхронной.
// Функция с ключевым словом async всегда без исключений возвращает Promise
// async function logUser() {
//     // await
//     const user = await getUser()
//     const updatedUser = await updateUser(user)
//     console.log(updatedUser)
//     // console.log(user.name)
// }
// logUser()