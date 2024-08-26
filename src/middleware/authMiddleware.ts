import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, JWT_SECRET, (err, user) => {

            if (err) {
                console.log(err)
                return res.sendStatus(403)
                
            }

            req.user = user
            next()
        })
    } else {
        res.sendStatus(401)
        console.log("UA")
    }
};

export default authMiddleware
