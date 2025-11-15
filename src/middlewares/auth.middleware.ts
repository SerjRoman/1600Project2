import {Request, Response, NextFunction} from "express"
import { TokenExpiredError, verify } from 'jsonwebtoken'
import { ENV } from "../config/env"

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization
    if(!authorization){
        res.status(401).json({message: "Authorization is required"})
        return
    }
    const [type, token] = authorization.split(" ") // ["Bearer", "TOKEN"]
    if(!type  ||  type != 'Bearer' || !token){
        res.status(401).json({message:"Authorization is in wrong format"})
        return
    }

    try {
        const payload = verify(token, ENV.JWT_ACCESS_SECRET_KEY) 
        if(typeof(payload) == 'string'){
            res.status(401).json({message: "Error with token, try again"})
            return
        }
        res.locals.userId = payload.id;
        next()
    } catch(err) {
        if (err instanceof TokenExpiredError) {
            res.status(401).json({message: "Token is expired! You must renew token"})
            return
        }
        res.status(500).json({ message: 'Server error. Try again later' })
    }
}