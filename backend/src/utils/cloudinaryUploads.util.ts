import fs from "fs";
import cloudinary from '../config/cloudinary.js';
import env from '../config/validateENV.config.js';

export const uploadToCloudinary = async (filePath: string) => {
    try {
        return await cloudinary.uploader.upload(filePath, {
            folder: env.CLOUDINARY_FOLDER,
        });
    } catch (error: any) {
        console.error("Error: ", error.message);
        return null;
    } finally {
        if (filePath) {
            fs.unlinkSync(filePath);
        }
    }
};

export const deleteFromCloudinary = async (publicId: string) => {
    return await cloudinary.uploader.destroy(publicId);
};
