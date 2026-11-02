import express from 'express';
import { createAccountController, verifyAccountController } from '../controller/userController.js';

const UserRouter = express.Router();

UserRouter.post('/createAccount', createAccountController);
UserRouter.get('/verifyEmail', verifyAccountController);

export default UserRouter;