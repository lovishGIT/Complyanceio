import { Router } from 'express';
import * as dataController from '../controllers/data.controller';
import verifyJWT from '../middlewares/verifyJWT';

const router = Router();

router
    .route('/')
    .get(verifyJWT, dataController.getData) // Assignment
    .post(verifyJWT, dataController.addData) // Assignment
router
    .route('/:id')
    .put(verifyJWT, dataController.updateData) // Assignment
    .delete(verifyJWT, dataController.deleteData); // Assignment

export default router;