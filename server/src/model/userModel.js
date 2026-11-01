import { postgresQueryHelper } from "../utils/postgresHelperFunctions"

// the user model which manages the user table
export default class UserModel {
    constructor() { }

    // the creation of the user
    async createUser() {
        const q = `
            INSERT INTO users(first_name, last_name, usename, phone, email, address, location) 
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;
        `
        return await postgresQueryHelper(q, "Internal server error, Failed to create users, userModel.js file");
    }

    // the retrival of the user
    async retrieveUser() {
        const q = `SELECT * FROM users;`
        return await postgresQueryHelper(q, 'Internal server error, Failed to retrieve users from the database, userModel.js file');
    }
}