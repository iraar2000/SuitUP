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
export async function retrieveRoleService() {
    try {
        return await role.retrieveRoles();
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve user account roles, userService.js file", errorDetails: error } };
    }
}

// the function is used to retrieve the roles by name
export async function retrieveRoleByNameService(name) {
    try {
        return await role.retrieveRolesByName(name);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve user account role by name, userService.js file", errorDetails: error } };
    }
}

// the function is used to edit the roles
export async function editRoleService(roleId, keys, values) {
    try {
        return await role.editRoles(roleId, keys, values);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to edit user account role, userService.js file", errorDetails: error } };
    }
}

// the function is used to remove the roles
export async function removeRoleService(roleId) {
    try {
        const removeResponse = await role.removeRoles(roleId);
        if (removeResponse.status !== 200) return removeResponse;

        // remove the user roles associated with the roleId
        const userRoleResponse = await userRole.editUserRolesByRoleId(roleId, 1); // 1 is the default role id
        if (userRoleResponse.status !== 200) return userRoleResponse;
        return { status: 200, data: { message: "Removed the role and associated user roles from the database successfully!", roleId: roleId } }
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to remove account role, userService.js file", errorDetails: error } };
    }
}

// the function is used to create user roles
export async function createUserRoleService(userId, roleId) {
    try {
        return await userRole.createUserRoles(userId, roleId);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create user role, roleService.js file", errorDetails: error } };
    }
}

// the function is used to retrieve user roles
export async function retrieveUserRoleService(userId) {
    try {
        return await userRole.retrieveUserRoles(userId);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve user role, roleService.js file", errorDetails: error } };
    }
}

// the function is used to edit user roles
export async function editUserRoleService(userId, newRole) {
    try {
        return await userRole.editUserRoles(userId, newRole);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to edit user role, roleService.js file", errorDetails: error } };
    }
}