const UserService: UserServiceContract = {
    getUser: function (id: number): User {
        console.log('1')
        console.log('1')
        console.log('1')
        console.log('1')
        console.log('1')
        console.log('1')
        console.log('1')
        console.log('1')
        console.log('1')
        return user
    },
    getUsers: function (): User[] {
        throw new Error("Function not implemented.")
    },
    delete: function (id: number): void {
        throw new Error("Function not implemented.")
    }
}





interface Teapot {
    brand: "Tefal"
}
type CoolString = string | null | undefined

// IUser
interface User {
    id: number
    name: CoolString
}

type SuperString = User | null


const user: User = {
    id: 1,
    name: "Kirill"
}

const users: User[] = []


type UserType = {
    name: string,
    id: number
}


const name3: CoolString = ""
const name2: CoolString = null

interface UserServiceContract {
    getUser: (id: number) => User,
    getUsers: () => User[],
    delete: (id: number) => void
}


UserService.getUser(4)

// Utility types - это специальные типы, которые позволяют выполнять полезную работу над типами/интерфейсами

// Omit<Type, "param" | "param2" | "param3"> - специальный тип, который позволяет убрать свойства объекта из указанного типа

type UserWithoutId = Omit<User, "id">

// Partial<Type> - специальный тип, который меняет все свойства объекта на опциональные

type PartialUser = Partial<User>