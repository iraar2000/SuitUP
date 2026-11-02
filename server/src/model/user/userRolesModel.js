import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

// the class which handles the userRoles
export default class UserRolesModel {
    constructor() { }

    // creating the user roles in the database
    async createUserRoles(userId, roleId) {
        const q = `INSERT INTO user_roles(user_id, role_id) VALUES($1, $2) RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to create the user roles, userRolesModel.js file", [userId, roleId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function which retrieves the user roles
    async retrieveUserRoles(userId) {
        const q = `
            SELECT r.name
            FROM user_roles AS ur
            JOIN roles AS r ON r.id = ur.role_id
            WHERE ur.user_id = $1;`;
        return await postgresQueryHelper(q, "Internal server error, failed to retrieve user roles by userId, userRolesModel.js file", [userId]);
    }
}