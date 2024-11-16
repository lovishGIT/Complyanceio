import { Router } from 'express';
import userRouter from "./user.routes";
import countryRouter from "./country.routes";

const router = Router();

router.use("/user", userRouter);
router.use("/country", countryRouter);

export default router;