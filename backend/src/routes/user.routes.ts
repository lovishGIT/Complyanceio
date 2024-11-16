import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const router = Router();

router.route("/verify_token").get(verifyJWT, userController.getUserByToken);
router.route("/find/:id").get(verifyJWT, userController.getUserById);

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/country").post(userController.updateUser); // Assignment
router.route("/update/:id").patch(verifyJWT, userController.updateUser);

router.route("/logout").get(verifyJWT, userController.logoutUser);
router.route("/refresh_token").post(verifyJWT, userController.generateTokens);

export default router;