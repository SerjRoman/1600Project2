
interface Banana {
    price: number
    size: number
}

// Generic(универсальный тип) - это параметр при работе с типизацией
//                                  unknown
//                                  
// function getData(endpoint: string): any {
//     console.log("Sending request by this url " + endpoint)
//     const data: any = fetch(endpoint)
//     return data
// }

// function getUsers() {
//     const url = "/users/"
//     const users = getData(url) // any
//     users
// }

                // T-type
                // S, K, U, L, O, R, E
function getData<T>(endpoint: string): T {
    console.log("Sending request by this url " + endpoint)
    const data: any = fetch(endpoint)
    return data
}

function getUsers() {
    const url = "/users/"
    const users = getData<string>(url)
}
function getBananas(): Banana[]{
    const url = '/bananas/'
    const bananas = getData<Banana[]>(url)
    // Должны делать return Bananas[], мы делаем return Banana
    return bananas
}


// function get<T>(data: T): T {
//     return data
// }
// const number = get<number>(5)
// const string = get<string>("21")

// Promise<>

interface SomeData<T, S> {
    status: "ok" | "error",
    code: number,
    data: T | S
}

const response: SomeData<string[], number[]> = {
    status: "ok",
    code: 200,
    data: ["user1", "user2", "user3"],
}

response.data.forEach( value => {
    if (typeof value === 'string') {
        value.length
        return
    }
    value.
})

const response2: SomeData<Banana[], Banana> = {
    status: "ok",
    code: 200,
    data: [
        {
            price: 5,
            size: 10
        },
        {
            price: 5,
            size: 10
        },
        {
            price: 5,
            size: 10
        },
        {
            price: 5,
            size: 10
        },
        {
            price: 5,
            size: 10
        },
        {
            price: 5,
            size: 10
        },
    ],
}
// any  ||  Banana[] | Banana


function getDataSuper<T>(endpoint: string): SomeData<T> {
    const data: T = getData<T>(endpoint)
    return {
        status: "ok",
        code: 500,
        data: data
    }
}

const response3 = getDataSuper<boolean[]>("")
// response3.data.
type B1 = Omit<Banana, "price">
// Promise<>