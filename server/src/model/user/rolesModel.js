import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

// the function which helps create the roles
export default class RolesModel {
    constructor() { }

    // the function which creates the roles in the database
    async createRoles(name, description) {
        const q = `INSERT INTO roles(name, description) VALUES($1, $2) RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to create roles in the database, rolesModel.js file", [name, description]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function which retrieves the roles from the database
    async retrieveRoles() {
        const q = `SELECT * FROM roles;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve roles from the database, rolesModel.js file", []);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data }
    }

    // the function which is used to retrieve the roles by roleName
    async retrieveRolesByName(name) {
        const q = `SELECT * FROM roles WHERE name=$1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve roles by name from the database, rolesModel.js file", [name]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function which removes the roles from the database
    async removeRoles(roleId) {
        const q = `DELETE FROM roles WHERE id=$1 RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to remove roles from the database, rolesModel.js file", [roleId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: { message: "Removed the role from the database successfully!", roleId: roleId } }
    }

    // the function which edits the roles in the database
    async editRoles(roleId, keys, values) {
        const setClause = keys.map((key, index) => { return `${key}=$${index + 2}`; });
        const q = `UPDATE roles SET ${setClause.join(', ')} WHERE id=$1 RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to edit roles in the database, rolesModel.js file", [roleId, ...values]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

}