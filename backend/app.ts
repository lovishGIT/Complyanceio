import express from 'express';
import cors from 'cors';
import routes from './src/routes/index.js';
import cookieParser from 'cookie-parser';
import env from './src/config/validateENV.config.js';

const app = express();

app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'https://complyanceio.vercel.app',
            env.FRONTEND_URL,
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use('/api', routes);

export default app;