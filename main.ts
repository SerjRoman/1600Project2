
// number, string, boolean, undefined, null, object, 
let number2: number = 5
let string: string = ""
let isAdmin: boolean = true


function sum(a: number, b: number): number {
    return a + b
}

sum(1, 2)
// sum("342", 5)

// Union Type - объединение

let human: string | boolean | number | null = true

human = "Human"
human = 5
human = null

function sayValue(value: string | number): string | boolean {
    console.log(value)

    return true
}

const arrayNumbers = [1,2,3,4,5]
const arrayStrings = ["", " ", ""]
const arrayBooleans: boolean[] = [true, false]
//                     
const array5: (string | number)[] = [1, 2, 3, "Helo", "2"]

const user: {
    name: string,
    age: number,
    isAdmin: boolean
} = {
    name: "Yulia",
    age: 15,
    isAdmin: false
}
const user2: {
    name: string,
    age: number,
    isAdmin: boolean
} = {
    name: "Gleb",
    age: 16,
    isAdmin: true
}

const arrayUsers: {
    name: string,
    age: number,
    isAdmin: boolean
}[][] = [[user, user2]]

const fruit: {
    name: string,
    age: number,
    isSoar: boolean
} = {
    name: "Orange",
    age: 2,
    isSoar: true
}
const fruit1:{
    name: string,
    age: number,
    isSoar?: boolean
} = {
    name: "Strawberry",
    age: 5,
}
function saySomething(value?: string) {
    console.log(value)
}
saySomething()
saySomething("")
// saySomething(555555)


// any - ЛЮБОЙ тип. ОЧЕНЬ специфический тип, использовать, только когда уверенны что any тут подходит
let human2: any = {name: "human"}
human2 = true
human2 = 5

// human2()

/*

Шаги действуий для работы с ts в проекте:

1. Скачать ts - npm i typescript
2. Скачать ts-node - npm i ts-node
3. Создать configTypeScript(файл настроек ts) - npx tsc --init . npx(node package executor) - позволяет запускать скрипты библиотек. 
4. В файле configa удалить "verbatimModuleSyntax": true,
5. В package.json меняем скрипт запуска сервера с использованием ts-node.(ts-node ./main.ts)


*/

console.log("TS coollllll")

/*
2 Вида экспорта(импорта):
1. экспорт/импорт значений ПО УМОЛЧАНИЮ. Такой экспорт из файла может существовать ТОЛЬКО ОДИН
*/

export default sayValue

// import ЛЮБОЕ_НАЗВАНИЕ from './main'

/*
2. Экспорт/импорт значений по их именам(импорт конкретных значений)
*/
export { human, human2, saySomething, isAdmin }

// import { human, human2, saySomething, isAdmin } from './main'

export const number5 = 5
