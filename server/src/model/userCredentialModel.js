import { postgresQueryHelper } from "../utils/postgresHelperFunctions.js"

export default class UserCredential {
    constructor() { }

    // create user login credentials
    async createUserCredentials(userId, passHash) {
        const q = `
            INSERT INTO user_credential(user_id, pass_hash, fail_attemps, last_login)
            VALUES($1, $2, $3, $4) RETURNING *;
        `
        const response = await postgresQueryHelper(q, "Internal server error, Failed to create user credentials, userCredentialModel.js file", [userId, passHash, 0, new Date()])
        if (response.status !== 200) return response;
        else return { status: response.status, data: response.data[0] }
    }
}