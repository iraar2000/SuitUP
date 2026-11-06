import { loginAccountService, logoutAccountService, refreshLoginService } from "../service/user/authService.js";
import { changePasswordService, forgotPasswordService } from "../service/user/passwordService.js";
import { createRolePermissionByNameService, retrievePermissionService } from "../service/user/permissionService.js";
import { createRoleService, createUserRoleService, editUserRoleService, retrieveUserRoleService, retrieveRoleService, removeRoleService, editRoleService } from "../service/user/roleService.js";
import { createAccountService } from "../service/user/userService.js";
import { createCredentialVerificationService, verifyAccountService } from "../service/user/verificationService.js";

// AUTHENTICATION

// the function which controlls the account creation
export async function createAccountController(req, res) {
    try {
        // create the account
        const response = await createAccountService(req.body);
        if (response.status !== 200) return res.status(response.status).json(response.data);

        // create the verification
        const credVerif = await createCredentialVerificationService(response.data);
        if (credVerif.status !== 200) return res.status(credVerif.status).json(credVerif.data);

        // create the account user role
        const userRole = await createUserRoleService(response.data.id, 1);
        if (userRole.status !== 200) return res.status(userRole.status).json(userRole.data);

        return res.status(response.status).json({ userData: response.data, message: "Verify the account!" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, Failed to create account, userController.js file", errorDetails: error });
    }
}

// the function which helps to login the account
export async function loginAccountController(req, res) {
    try {
        const response = await loginAccountService(req.body);
        if (response.status !== 200) return res.status(response.status).json(response.data);

        const { accessToken, refreshToken, profile } = response.data;
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/auth/refresh",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        return res.status(response.status).json({ accessToken, userData: { ...profile } });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to login the account." });
    }
}

// the function which controlls the refresh of login access token
export async function refreshLoginController(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ error: "Refresh token is missing." });

        const response = await refreshLoginService(refreshToken);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to refresh the login, userController.js file", errorDetails: error });
    }
}

// the function which controlls the account logout
export async function logoutAccountController(req, res) {
    try {
        const logoutResponse = await logoutAccountService(req.cookies.refreshToken);
        if (logoutResponse.status !== 200) return res.status(logoutResponse.status).json(logoutResponse.data);

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/auth/refresh"
        });
        return res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to logout the account, userController.js file", errorDetails: error });
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

// the function which controlls the change of password
export async function changePasswordController(req, res) {
    try {
        const { email, password, token } = req.body;
        const response = await changePasswordService(email, password, token);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to change the password, userController.js file", errorDetails: error });
    }
}

// the function which controlls the forgot password
export async function forgotPasswordController(req, res) {
    try {
        console.log(req);
        const ipAddress = process.env.IPADDRESS || req.ip; // Use the environment variable or fallback to req.ip
        const response = await forgotPasswordService(ipAddress, req.body.email);
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error, failed to process forgot password request, userController.js file", errorDetails: error });
    }
}

// the function which controlls the reset of password
export async function resetPasswordController(req, res) {
    try {

    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to reset the password, userController.js file", errorDetails: error });
    }
}

// ROLES

// the function which helps to create the roles
export async function createRolesController(req, res) {
    try {
        const response = await createRoleService(req.body.name, req.body.description);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create the userAccountRoles in database, userController.js file", errorDetails: error });
    }
}

// the function which helps to retrieve the roles
export async function retrieveRolesController(req, res) {
    try {
        const response = await retrieveRoleService();
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to retrieve the userAccountRoles from database, userController.js file", errorDetails: error });
    }
}

// the function which helps to edit the roles
export async function editRolesController(req, res) {
    try {
        const roleId = req.body.roleId;
        delete req.body.roleId; // Remove roleId from the body to avoid updating it
        const response = await editRoleService(roleId, Object.keys(req.body), Object.values(req.body));
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to edit the userAccountRoles in database, userController.js file", errorDetails: error });
    }
}

// the function which helps to remove the roles
export async function removeRolesController(req, res) {
    try {
        const response = await removeRoleService(req.params.id);
        console.log(response);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to remove the userAccountRoles from database, userController.js file", errorDetails: error });
    }
}

// the function which creates the user roles
export async function createUserRolesController(req, res) {
    try {
        // first check if the user already has a role
        const roleResponse = await retrieveUserRoleService(req.body.userId);

        // if the user already has a role then update the role otherwise create a new role
        if (roleResponse.status === 200 && roleResponse.data) {
            const updateResponse = await editUserRoleService(req.body.userId, req.body.roleId);
            return res.status(updateResponse.status).json(updateResponse.data);
        }

        const response = await createUserRoleService(req.body.userId, req.body.roleId);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create user roles, userController.js file", errorDetails: error });
    }
}

// PERMISSIONS

// the function which helps to create the permissions
export async function createPermissionsController(req, res) {
    try {
        const response = await createPermissionService(req.body.name);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create the userAccountPermissions in database, userController.js file", errorDetails: error });
    }
}

// the function which helps to remove the permissions
export async function removePermissionsByIdController(req, res) {
    try {
        const response = await removePermissionByIdService(req.params.id);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to remove the userAccountPermissions from database, userController.js file", errorDetails: error });
    }
}

export async function removePermissionsByNameController(req, res) {
    try {
        const response = await removePermissionByNameService(req.params.name);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to remove the userAccountPermissions from database, userController.js file", errorDetails: error });
    }
}

// the function which helps to retrieve permissions
export async function retrievePermissionsController(req, res) {
    try {
        const response = await retrievePermissionService();
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to retrieve the userAccountPermissions from database, userController.js file", errorDetails: error });
    }
}

// the function which helps to create the role permissions by name
export async function createRolePermissionByNameController(req, res) {
    try {
        const response = await createRolePermissionByNameService(req.body.role, req.body.permission);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create the userAccountRolePermissions in database, userController.js file", errorDetails: error });
    }
}
