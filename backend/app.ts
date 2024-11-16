import express from 'express';
import cors from 'cors';
import routes from './src/routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();

// Basic CORS setup
app.use(
    cors({
        origin: [
            'https://complyanceio.vercel.app',
            'http://localhost:5173',
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
