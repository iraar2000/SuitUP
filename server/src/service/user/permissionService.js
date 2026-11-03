import PermissionsModel from "../../model/user/permissionsModel.js";
import RolePermissionsModel from "../../model/user/rolePermissionsModel.js";
import { retrieveRoleByNameService } from "./roleService.js";

const permissionModel = new PermissionsModel();
const rolePermissionModel = new RolePermissionsModel();

// the function is used to retrieve the permissions
export async function retrievePermissionService() {
    try {
        return await permissionModel.retrieveAllPermissions();;
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve user account permissions, permissionService.js file", errorDetails: error } };
    }
}

// the function is used to create the permissions
export async function createPermissionService(name) {
    try {
        return await permissionModel.createPermissions(name);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create user account permission, permissionService.js file", errorDetails: error } };
    }
}

// the function is used to edit the permissions
export async function editPermissionService(permId, value) {
    try {
        return await permissionModel.editPermissions(permId, value);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to edit user account permission, permissionService.js file", errorDetails: error } };
    }
}

// the function is used to retrieve the permissions by name
export async function retrievePermissionByNameService(name) {
    try {
        return await permissionModel.retrievePermissionsByName(name);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve user account permission by name, permissionService.js file", errorDetails: error } };
    }
}

// the function is used to remove the permission
export async function removePermissionByIdService(permId) {
    try {
        return await permissionModel.removePermissionsById(permId);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to remove user account permission, permissionService.js file", errorDetails: error } };
    }
}

export async function removePermissionByNameService(name) {
    try {
        return await permissionModel.removePermissionsByName(name);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to remove user account permission, permissionService.js file", errorDetails: error } };
    }
}

// the function is used to create the role permissions
export async function createRolePermissionService(roleId, permId) {
    try {
        return await rolePermissionModel.createRolePermissions(roleId, permId);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create user account role permission, permissionService.js file", errorDetails: error } };
    }
}

// the function is used to create rolePermission by role name and permission name
export async function createRolePermissionByNameService(roleName, permissionName) {
    try {
        // Retrieve role
        const roleResponse = await retrieveRoleByNameService(roleName);
        if (roleResponse.status !== 200) return roleResponse;

        // Retrieve or create permission
        let permResponse = await permissionModel.retrievePermissionsByName(permissionName);
        console.log("Permission Response:", permResponse);

        if (permResponse.status !== 200 || !permResponse.data) {
            permResponse = await createPermissionService(permissionName);
            if (permResponse.status !== 200) return permResponse;
        }

        console.log("Role ID:", roleResponse.data.id, "Permission ID:", permResponse.data.id);
        // Optional: Check if mapping already exists
        const existing = await rolePermissionModel.retrieveRolePermission(roleResponse.data.id, permResponse.data.id);
        if (existing.status === 200 && existing.data) return existing;

        // Create mapping
        return await rolePermissionModel.createRolePermissions(roleResponse.data.id, permResponse.data.id);

    } catch (error) {
        console.error("Error in createRolePermissionByNameService:", error);
        return { status: 500, data: { error: "Internal server error, failed to create role permission by name, permissionService.js file", errorDetails: error } };
    }
}

// the function is used to retrieve the role permissions
export async function retrieveRolePermissionService(roleId) {
    try {
        return await rolePermissionModel.retrieveRolePermissions(roleId);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve user account role permissions, permissionService.js file", errorDetails: error } };
    }
}
