import { Router } from 'express';
import userRouter from "./user.routes";
import countryRouter from "./country.routes";
import dataRouter from "./data.routes";

const router = Router();

router.use("/user", userRouter);
router.use("/country", countryRouter);
router.use('/data', dataRouter);

export default router;