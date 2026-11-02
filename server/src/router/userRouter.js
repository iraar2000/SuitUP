import express from 'express';
import { createAccountController, createRolesController, createUserRolesController, loginAccountController, verifyAccountController } from '../controller/userController.js';

const UserRouter = express.Router();

// authentication
UserRouter.post('/auth/createAccount', createAccountController);
UserRouter.post('/auth/loginAccount', loginAccountController);
UserRouter.get('/auth/verifyEmail', verifyAccountController);


// roles
UserRouter.post('/role/create', createRolesController);

// user 
UserRouter.post('/assignRole', createUserRolesController);

export default UserRouter;