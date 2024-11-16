import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model.js';
import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/generateToken.util.js';
import { IUser } from '../types/userTypes.js';
import asyncHandler from '../utils/asyncHandler.util.js';

export const registerUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, password, country } = req.body;
        if (!username || !email || !password || !country) {
            return res.status(400).json({
                message: 'Please provide all required fields',
            });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'User Already Exists',
                data: existingUser,
            });
        }

        const user: IUser | null = await User.create({
            username,
            email,
            password,
            country,
            role: 'User',
        });
        if (!user) {
            return res.status(400).json({
                message: 'Error creating user',
            });
        }

        req.user = {
            _id: user._id,
            role: user.role,
        };
        req.statusCode = 201;
        req.body = {
            success: true,
            message: 'User registered successfully',
            data: user.getSendableUser(),
        };

        return generateTokens(req, res, next);
    }
);

export const loginUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const user: IUser | null = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
            });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(400).json({
                message: 'Invalid Password.',
            });
        }

        req.user = {
            _id: user._id,
            role: user.role,
        };

        req.statusCode = 200;
        req.body = {
            success: true,
            message: 'Login Successful',
            data: user.getSendableUser(),
        };

        return generateTokens(req, res, next);
    }
);

export const updateUser = asyncHandler(
    async (req: Request, res: Response) => {
        if (req.user?._id?.toString() !== req.params.id.toString()) {
            return res.status(403).json({
                message: 'You are not authorized to perform this action',
            });
        }
        const { username, email, country } = req.body;
        const user = await User.findByIdAndUpdate({ _id: req.params.id }, {
            username, email, country
        }, {
            new: true,
        }) as IUser;

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        return res.status(200).json({
            message: 'User updated successfully',
            data: user.getSendableUser(),
        });
    }
);

export const logoutUser = asyncHandler(
    async (req: Request, res: Response) => {
        if (!req.user) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        await User.findByIdAndUpdate(
            { _id: req.user._id },
            { refreshToken: null }
        );

        return res
            .status(200)
            .clearCookie('accessToken')
            .clearCookie('refreshToken')
            .json({
                message: 'Logout Successful',
            });
    }
);

export const generateTokens = asyncHandler(
    async (
        req: Request,
        res: Response,
    ) => {
        if (!req.user) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        const accessToken = generateAccessToken(req.user);
        const refreshToken = generateRefreshToken(req.user);

        User.findByIdAndUpdate(
            { _id: req.user._id },
            { refreshToken }
        ).catch((err) => {
            console.error('Error updating refresh token in DB:', err);
        });

        if ((req.body && !req.statusCode) || (req.statusCode && !req.body)) {
            console.error('Developer Error Alert: Request Object is not properly formatted');
            return res.status(500).json({
                message: 'Internal Server Error',
            });
        } // Request Manupilation Cyber Attack Prevention

        return res
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
            .status(req.statusCode || 200)
            .json(
                req.body || {
                    message: 'Token generated successfully',
                }
            );
    }
);

export const getUserByToken = asyncHandler(
    async (req: Request, res: Response) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'User found',
            data: user,
        });
    }
);

export const getUserById = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'User found',
            data: user,
        });
    }
);