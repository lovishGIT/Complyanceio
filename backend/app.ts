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
].filter(Boolean); // Remove any undefined values

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(`Blocked origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
    ],
    exposedHeaders: ['set-cookie'],
    maxAge: 86400, // 24 hours
};

// Apply CORS middleware first
app.use(cors(corsOptions));

// Logging middleware
app.use((req, res, next) => {
    console.log(
        `${new Date().toISOString()} - ${req.method} ${req.path}`
    );
    console.log(`Origin: ${req.headers.origin}`);
    next();
});

// Parse cookies and JSON body before routes
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Error handling middleware for CORS errors
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        res.status(403).json({
            error: 'CORS Error',
            message:
                'This origin is not allowed to access this resource',
        });
    } else {
        next(err);
    }
});

// Routes
app.use('/api', routes);

export default app;
