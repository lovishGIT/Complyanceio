import { Request, Response } from 'express';
import Country from '../models/country.model';
import {
    uploadToCloudinary,
    deleteFromCloudinary,
} from '../utils/cloudinaryUploads.util';
import asyncHandler from '../utils/asyncHandler.util';

export const getAllCountries = asyncHandler(
    async (req: Request, res: Response) => {
        const countries = await Country.find();
        if (!countries) {
            return res.status(404).json({
                success: true,
                message: "No countries found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Countries found",
            countries
        });
    }
);

export const getCountriesById = asyncHandler(
    async (req: Request, res: Response) => {
        const country = await Country.findById({ _id: req.params.id });
        if (!country) {
            return res.status(404).json({
                success: false,
                message: "Country Not Found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Country Found",
            country
        });
    }
);

export const getCountryByName = asyncHandler(
    async (req: Request, res: Response) => {
        const country = await Country.findOne({ name: req.params.name.toLowerCase() });
        if (!country) {
            return res.status(404).json({
                success: false,
                message: "Country Not Found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Country Found",
            country
        });
    }
);

export const addCountry = asyncHandler(
    async (req: Request, res: Response) => {
        if (req?.user?.role?.toLowerCase() !== 'admin') {
            return res.status(403).json({
                message: 'You are not authorized to perform this action',
            });
        }
        const { name, code, population, region } = req.body;
        const result = req.file ? await uploadToCloudinary(req.file.path) : null;

        const country = await Country.create({
            name,
            code,
            population,
            region,
            image: result ? {
                url: result.secure_url,
                public_id: result.public_id,
            } : undefined,
        });

        return res.status(201).json({
            success: true,
            message: 'Country added successfully',
            country,
        });
    }
);

export const updateCountryById = asyncHandler(
    async (req: Request, res: Response) => {
        const { name, code, population, region } = req.body;
        if (req?.user?.role?.toLowerCase() !== "admin") {
            return res.status(403).json(
                { message: "You are not authorized to perform this action" }
            );
        }
        const country = await Country.findByIdAndUpdate(req.params.id, {
            name,
            code,
            population,
            region,
        }, {
            new: true
        });
        if (!country) {
            return res.status(404).json({
                success: false,
                message: "Country not found",
            })
        }

        if (req.file) {
            if (country.image?.public_id) {
                await deleteFromCloudinary(country.image.public_id);
            }
            const result = await uploadToCloudinary(req.file.path);
            if (!result) {
                return res.status(500).json({
                    success: false,
                    message: "Error uploading image",
                });
            }
            country.image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
        }

        await country.save();

        return res.status(200).json({
            success: true,
            message: "Country updated successfully",
            country
        });
    }
);

export const deleteCountryById = asyncHandler(
    async (req: Request, res: Response) => {
        if (req?.user?.role?.toLowerCase() !== 'admin') {
            return res.status(403).json({
                message:
                    'You are not authorized to perform this action',
            });
        }
        const { id } = req.params;
        const country = await Country.findById(id);
        if (!country)
            return res
                .status(404)
                .json({ message: 'Country not found' });

        if (country.image?.public_id) {
            await deleteFromCloudinary(country.image.public_id);
        }

        await country.deleteOne();
        res.status(200).json({
            message: 'Country deleted successfully',
        });
    }
);
