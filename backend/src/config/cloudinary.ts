import { v2 as cloudinary } from 'cloudinary';
import env from './validateENV.config.js';

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    folder: env.CLOUDINARY_FOLDER,
    secure: true,
});

export default cloudinary;
