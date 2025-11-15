import { Prisma } from "../generated/prisma";
import { Request, Response } from "express";
import { ErrorResponse } from "../genericTypes/error.types";

export type User = Prisma.UserGetPayload<{}>
export type UserWithoutPassword = Prisma.UserGetPayload<{ omit: { password: true } }>
// Payload - полезная нагрузка - 
// Credentials - данные для подтверждения личности(верификация)
export type LoginCredentials = {
    email: string
    password: string
}
export type RegisterCredentials = {
    email: string
    password: string
    username: string
    avatar?: string
}

// Authentication
export interface UserAuthenticationResponse{
    token: string
}


export type UserCreate = Prisma.UserUncheckedCreateInput
export interface UserControllerContract {
    login(request: Request<object, ErrorResponse | UserAuthenticationResponse, LoginCredentials>, response: Response<ErrorResponse | UserAuthenticationResponse>): Promise<void>;
    register(request: Request<object, ErrorResponse | UserAuthenticationResponse, RegisterCredentials>, response: Response<ErrorResponse | UserAuthenticationResponse>): Promise<void>;
    me(request: Request<object, ErrorResponse | UserWithoutPassword, object, object, {userId: number}>, response: Response<ErrorResponse | UserWithoutPassword, {userId: number}>): Promise<void>
}
// headers - Authorization

export interface UserServiceContract {
    login(credentials: LoginCredentials): Promise<string>;
    register(credentials: RegisterCredentials): Promise<string>;
    me(userId: number): Promise<UserWithoutPassword>
}

export interface UserRepositoryContract {
    getUserByEmail(email: string): Promise<User | null>
    createUser(userData: UserCreate): Promise<User>
    getUserWithoutPasswordById(id: number): Promise<UserWithoutPassword | null>
}












// CLient: Login -> POST /login
// Django -> Request /login. Устанавливает Read-Only cookie  - id: 123
// 


// id - 123



// id = 890


// JWT(Дзот) - JSONWebToken - специальный токен, который хранит информацию в формате JSON записанные в виде ПРОСТО СТРОКИ
// "hduoawe4pahtp4wht4oahqh4uq" {id: 123 }

// JWT хранит следующее ->  {Header, Payload, Signature}

// Header - доп. информация о токене
// Payload - записанные данные(например, userId)
// Signature - подпись

// JWT МОЖЕТ расшифровать ЛЮБОЙ человек(используется очень просто алгоритм шифрования)
// Безопасность токена в Signature

// /me -> id -> UserData(email, username, avatar)