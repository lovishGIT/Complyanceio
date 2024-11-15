import * as express from 'express';
import { RequestUser } from '../userTypes';

declare global {
    namespace Express {
        interface Request {
            user?: RequestUser;
        }
    }
}