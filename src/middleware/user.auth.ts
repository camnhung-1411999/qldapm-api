import { Request, Response } from 'express';
import authUtils from '../utils/auth';
export const User = async (req: Request, res: Response) => {
    const token = req.headers['authorization']?.split(' ');
    const accessToken =  token? token[1] : undefined;
    if(!accessToken) {
        res.status(400).json({
            name: 'ERROR',
            message: 'Authorization is required'
        })
    }
    else {
       const verifyUser:any = await authUtils.verifyJWT(accessToken);
       return verifyUser.user;
    }
}