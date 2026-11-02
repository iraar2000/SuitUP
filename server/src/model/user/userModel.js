import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js"

// the user model which manages the user table
export default class UserModel {
    constructor() { }

    // the creation of the user
    async createUser(userData) {
        const q = `
            INSERT INTO users(first_name, last_name, username, phone, email, address, location) 
            VALUES($1, $2, $3, $4, $5, $6, ST_SetSRID(ST_MakePoint($7, $8), 4326)) RETURNING *;
        `
        const response = await postgresQueryHelper(q, "Internal server error, Failed to create users, userModel.js file", [...userData]);

        if (response.status === 409) response.data.message = "User credential already exists.";
        if (response.status !== 200) return response;
        else return { status: response.status, data: response.data[0] }
    }

    // the retrival of the user by userId
    async retrieveUserById(userId) {
        const q = `SELECT * FROM users WHERE id=$1;`
        const response = await postgresQueryHelper(q, 'Internal server error, Failed to retrieve users from the database, userModel.js file', [userId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the retrieval of the user by userEmail
    async retrieveUserByEmail(userEmail) {
        const q = `SELECT * FROM users WHERE email=$1;`
        const response = await postgresQueryHelper(q, 'Internal server error, Failed to retrieve users from the database, userModel.js file', [userEmail]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the retrieval of the user by userMobile
    async retrieveUserByPhone(userPhone) {
        const q = `SELECT * FROM users WHERE phone=$1;`
        const response = await postgresQueryHelper(q, 'Internal server error, Failed to retrieve users from the database, userModel.js file', [userPhone]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }
}