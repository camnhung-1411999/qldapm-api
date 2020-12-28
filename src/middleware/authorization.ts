import { Request, Response, NextFunction } from 'express';
import authUtils from '../utils/auth';
export const author = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ');
    const accessToken =  token? token[1] : undefined;
    if(!accessToken) {
        res.status(400).json({
            name: 'ERROR',
            message: 'Authorization is required'
        })
    }
    else {
       await authUtils.verifyJWT(accessToken).then((result) => {
            next();
       }).catch((err) => {
        res.status(401).json({
            name: 'ERROR',
            message: 'TOKEN_EXPIRED'
        })
       })
    }
}