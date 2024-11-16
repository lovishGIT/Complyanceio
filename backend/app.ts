import express from 'express';
import cors from 'cors';
import routes from './src/routes/index.js';
import cookieParser from 'cookie-parser';
import env from './src/config/validateENV.config.js';

const app = express();

// Update CORS configuration
app.use(
    cors({
        origin: [
            'http://localhost:5173', // Local development
            'https://complyanceio.vercel.app', // Production frontend
            env.FRONTEND_URL, // Backup from env if needed
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add supported methods
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Add allowed headers
    })
);

// Enable preflight for all routes
// app.options('*', cors()); // Important for handling preflight requests

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

// Add CORS headers middleware for additional security
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin); // Dynamically set based on request
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Cookie'
    );
    next();
});

app.use('/api', routes);

export default app;