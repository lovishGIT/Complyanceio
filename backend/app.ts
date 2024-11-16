import express from 'express';
import cors from 'cors';
import routes from './src/routes/index.js';
import cookieParser from 'cookie-parser';
import env from './src/config/validateENV.config.js';

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://complyanceio.vercel.app',
    env.FRONTEND_URL,
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow cookies to be sent
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    })
);

app.options('*', cors()); // Preflight request handler

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use('/api', routes);

export default app;