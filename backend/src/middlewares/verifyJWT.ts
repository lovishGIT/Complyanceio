import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.util.js';
import env from '../config/validateENV.config.js';

const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1] || req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    }

    const verified = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = {
        _id: verified._id,
        role: verified.role,
    };
    next();
});

export default verifyJWT;