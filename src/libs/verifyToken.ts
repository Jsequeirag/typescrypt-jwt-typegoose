import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
export interface tokenVerified {
    id: string;
    iat: number;
}
export const verifyToken = (req : Request, res : Response, next : NextFunction) => {
    try {
        const token = req.header("x-access-token");
        if (! token) 
            return res.status(400).json({message: "token doesn't exist"});
        
        const tokenVerified = jwt.verify(token, "secret")as tokenVerified;

        req.body.userId = tokenVerified.id;
        console.log(tokenVerified.id);
        next();
    } catch (e) {
        console.log(e);
        res.status(500).json({message: "server error"});
    }
};
