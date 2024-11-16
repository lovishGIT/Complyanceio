import { Router } from 'express';
import userRouter from './user.routes.js';
import countryRouter from './country.routes.js';
import dataRouter from './data.routes.js';

const router = Router();

router.use("/user", userRouter);
router.use("/country", countryRouter);
router.use('/data', dataRouter);

export default router;