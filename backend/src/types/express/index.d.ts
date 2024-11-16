import * as express from 'express';
import { RequestUser } from '../userTypes.js';

declare global {
    namespace Express {
        interface Request {
            user?: RequestUser;
        }
    }
}