import { cleanEnv, str, num } from 'envalid';
import "dotenv/config";

const env = cleanEnv(process.env, {
    PORT: num({
        default: 3000,
    }),
    FRONTEND_URL: str(),
    MONGO_URI: str(),
    JWT_SECRET: str(),
    ACCESS_TOKEN_EXPIRY: str({
        default: '1h',
    }),
    REFRESH_TOKEN_EXPIRY: str({
        default: '7d',
    }),
    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),
    CLOUDINARY_FOLDER: str(),
});

export default env;