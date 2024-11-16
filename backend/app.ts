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
            // Allow requests with no origin (e.g., server-to-server or Postman)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                // Return a proper error response for disallowed origins
                callback(null, false); // Reject but gracefully
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    })
);

// app.options('*', cors()); // Preflight request handler
app.use((req, res, next) => {
    console.log(`Request Origin: ${req.headers.origin}`);
    console.log(`Request Method: ${req.method}`);
    next();
});
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Origin',
            req.headers.origin || ''
        );
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS'
        );
        res.header(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization, X-Requested-With'
        );
        res.sendStatus(200); // Respond OK to preflight
    } else {
        next();
    }
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use('/api', routes);

export default app;