import jwt from 'jsonwebtoken';
import env from '../config/validateENV.config';
import { RequestUser } from '../types/userTypes';

export const generateAccessToken = (user: RequestUser): string => {
    return jwt.sign({
        _id: user._id,
        role: user.role,
    }, env.JWT_SECRET, { expiresIn: env.ACCESS_TOKEN_EXPIRY });
};

export const generateRefreshToken = (user: RequestUser): string => {
    return jwt.sign(
        {
            _id: user._id,
        },
        env.JWT_SECRET,
        { expiresIn: env.REFRESH_TOKEN_EXPIRY }
    );
};