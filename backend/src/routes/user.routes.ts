import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import verifyJWT from '../middlewares/verifyJWT';

const router = Router();

router.route('/register').post(userController.registerUser);
router.route("/login").post(userController.loginUser);

router.route("/refresh_token").post(verifyJWT, userController.generateTokens);
router.route("/logout").post(verifyJWT, userController.logoutUser);

export default router;