import { Request, Response } from 'express';
import Data from '../models/data.model';
import asyncHandler from '../utils/asyncHandler.util';
import User from '../models/user.model';

export const getData = asyncHandler(
    async (req: Request, res: Response) => {
        const country = await User.findById(req?.user?._id).select("country");
        const data = await Data.find({
            country: country?.country,
        });
        res.status(200).json(data);
    }
);

export const addData = asyncHandler(
    async (req: Request, res: Response) => {
        if (req?.user?.role?.toLowerCase() !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to access this route",
            });
        }
        const newData = req.body;
        const createdData = await Data.create(newData);
        res.status(201).json(createdData);
    }
);
export const updateData = asyncHandler(
    async (req: Request, res: Response) => {
        if (req?.user?.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message:
                    "You don't have permission to access this route",
            });
        }
        const dataId = req.params.id;
        const updatedData = req.body;
        const result = await Data.findByIdAndUpdate(
            dataId,
            updatedData,
            {
                new: true,
            }
        );
        res.status(200).json(result);
    }
);

export const deleteData = asyncHandler(
    async (req: Request, res: Response) => {
        if (req?.user?.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message:
                    "You don't have permission to access this route",
            });
        }
        const dataId = req.params.id;
        await Data.findByIdAndDelete(dataId);
        res.status(204).send();
    }
);
