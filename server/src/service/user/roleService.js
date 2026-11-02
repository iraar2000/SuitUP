import RolesModel from "../../model/user/rolesModel.js";
import UserRolesModel from "../../model/user/userRolesModel.js";

const role = new RolesModel();
const userRole = new UserRolesModel();

// the function is used to create the roles
export async function createRoleService(name, description) {
    try {
        return await role.createRoles(name, description);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create user account role, userService.js file", errorDetails: error } };
    }
}

// the function is used to retrieve the roles
export async function retrieveRoleService() { }

// the function is used to edit the roles
export async function editRoleService() { }

// the function is used to remove the roles
export async function removeRoleService() { }

// the function is used to create user roles
export async function createUserRoleService(userId, roleId) {
    try {
        return await userRole.createUserRoles(userId, roleId);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create user role, roleService.js file", errorDetails: error } };
    }
}

// the function is used to edit user roles
export async function editUserRoleService(userId, roleId, newRole) {
    try {
        return
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to edit user role, roleService.js file", errorDetails: error } };
    }
}