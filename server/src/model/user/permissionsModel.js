import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

// the permissions model is used to define the permissions of the user
export default class PermissionsModel {
    constructor() { }

    // the function which retrieves all the permissions of the user
    async retrieveAllPermissions() {
        const q = `SELECT * FROM permissions;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve all permissions from the database, permissionsModel.js file");
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data }
    }

    // the function which retrieves the permissions of the user
    async retrievePermissionsByName(name) {
        const q = `SELECT * FROM permissions WHERE name=$1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve permissions from the database, permissionsModel.js file", [name]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function which edits the permissions of the user
    async editPermissions(permId, value) {
        const q = `UPDATE permissions SET name=$2 WHERE id=$1 RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to edit permissions in the database, permissionsModel.js file", [permId, value]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function which creates the permissions of the user
    async createPermissions(name) {
        const q = `INSERT INTO permissions(name) VALUES($1) RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to create permissions in the database, permissionsModel.js file", [name]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function which removes the permissions of the user by permId
    async removePermissionsById(permId) {
        const q = `DELETE FROM permissions WHERE id=$1 RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to remove permissions from the database by id, permissionsModel.js file", [permId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: { message: "Removed the permission from the database successfully!", permId: permId } }
    }

    // the function which removes the permissions of the user by name
    async removePermissionsByName(name) {
        const q = `DELETE FROM permissions WHERE name=$1 RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to remove permissions from the database by name, permissionsModel.js file", [name]);
        if (response.status !== 200) return response;
        return { status: response.status, data: { message: "Removed the permission from the database successfully!", name: name } }
    }
}