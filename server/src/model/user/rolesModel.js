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
}