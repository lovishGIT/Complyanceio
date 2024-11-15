import { cleanEnv, str, num } from 'envalid';
import "dotenv/config";

const env = cleanEnv(process.env, {
    PORT: num({
        default: 3000,
    }),
    MONGO_URI: str(),
    JWT_SECRET: str(),
    ACCESS_TOKEN_EXPIRY: str({
        default: "1h",
    }),
    REFRESH_TOKEN_EXPIRY: str({
        default: "7d",
    }),
});

export default env;