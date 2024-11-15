import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import verifyJWT from '../middlewares/verifyJWT';

const router = Router();

router.route('/register').post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/logout").get(verifyJWT, userController.logoutUser);

router.route("/verify_token").get(verifyJWT, userController.getUserByToken);
router.route("/find/:id").get(verifyJWT, userController.getUserById);

router.route("/refresh_token").post(verifyJWT, userController.generateTokens);

export default router;