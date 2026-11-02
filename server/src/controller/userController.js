import { loginAccountService } from "../service/user/authService.js";
import { createRoleService, createUserRoleService } from "../service/user/roleService.js";
import { createAccountService } from "../service/user/userService.js";
import { createCredentialVerificationService, verifyAccountService } from "../service/user/verificationService.js";

// the function which controlls the account creation
export async function createAccountController(req, res) {
    try {
        // create the account
        const response = await createAccountService(req.body);
        if (response.status !== 200) return response;

        // create the verification
        const credVerif = await createCredentialVerificationService(response.data);
        if (credVerif.status !== 200) return credVerif;

        return res.status(response.status).json({ userData: response.data, message: "Verify the account!" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, Failed to create account, userController.js file", errorDetails: error });
    }
}

// the function which helps to login the account
export async function loginAccountController(req, res) {
    try {
        const response = await loginAccountService(req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to login the account, userController.js file", errorDetails: error });
    }
}

// the function which controlls the account verification
export async function verifyAccountController(req, res) {
    try {
        const { token, type } = req.query;
        const response = await verifyAccountService(token, type);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to verify the account, userController.js file", errorDetails: error });
    }
}

// the function which helps to create the roles
export async function createRolesController(req, res) {
    try {
        const response = await createRoleService(req.body.name, req.body.description);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create the userAccountRoles in database, userController.js file", errorDetails: error });
    }
}

// the function which creates the user roles
export async function createUserRolesController(req, res) {
    try {
        const response = await createUserRoleService(req.params.userId, req.params.roleId);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create user roles, userController.js file", errorDetails: error });
    }
}

