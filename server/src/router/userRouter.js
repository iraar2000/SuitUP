import express from 'express';
import { createAccountController, createPermissionsController, createRolePermissionByNameController, createRolesController, createUserRolesController, editRolesController, loginAccountController, logoutAccountController, refreshLoginController, removePermissionsByIdController, removePermissionsByNameController, removeRolesController, retrieveRolesController, verifyAccountController } from '../controller/userController.js';
import Authentication from '../middleware/authentication.js';
import { retrievePermissionService } from '../service/user/permissionService.js';

const UserRouter = express.Router();

// authentication
UserRouter.post('/auth/createAccount', createAccountController);
UserRouter.post('/auth/loginAccount', loginAccountController);
UserRouter.post('/auth/logoutAccount', logoutAccountController);
UserRouter.get('/auth/verifyEmail', verifyAccountController);
UserRouter.get('/auth/refresh', refreshLoginController);

// roles
UserRouter.post('/role/create', Authentication, createRolesController);
UserRouter.get('/role/retrieve', Authentication, retrieveRolesController);
UserRouter.put('/role/edit', Authentication, editRolesController);
UserRouter.delete('/role/remove/:id', Authentication, removeRolesController);

// permission
UserRouter.post('/permission/create', Authentication, createPermissionsController);
UserRouter.post('/permission/createRolePermissionByName', createRolePermissionByNameController);
UserRouter.get('/permission/retrieve', Authentication, retrievePermissionService);
UserRouter.delete('/permission/removeById/:id', Authentication, removePermissionsByIdController);
UserRouter.delete('/permission/removeByName/:name', Authentication, removePermissionsByNameController);

// user 
UserRouter.post('/assignRole', Authentication, createUserRolesController);

export default UserRouter;