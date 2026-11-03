import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

// the class model is used to handle the user permissions in the database
export default class RolePermissionsModel {
    constructor() { }

    // the function is used to create the role permissions
    async createRolePermissions(roleId, permId) {
        const q = `INSERT INTO role_permissions(role_id, permission_id) VALUES($1, $2) RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to create the role permissions, rolePermissionsModel.js file", [roleId, permId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function is used to retrieve the role permissions by roleId and permId
    async retrieveRolePermission(roleId, permId) {
        const q = `SELECT * FROM role_permissions WHERE role_id=$1 AND permission_id=$2;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve the role permissions, rolePermissionsModel.js file", [roleId, permId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function is used to retrieve the role permissions by roleId
    async retrieveRolePermissions(roleId) {
        const q = `
            SELECT p.name
            FROM role_permissions AS rp
            JOIN permissions AS p ON p.id = rp.permission_id
            WHERE rp.role_id = $1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve the role permissions, rolePermissionsModel.js file", [roleId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }
}