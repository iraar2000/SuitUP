import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js"

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

    // retrieve user credential using userId
    async retrieveUserCredentials(userId) {
        const q = `SELECT * FROM user_credential WHERE user_id=$1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve user credentials, userCredentialModel.js file", [userId])
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function is used to update the user credentials
    async updateUserCredentials(userId, keys, values) {
        const setValues = [...keys.map((key, index) => `${key}=$${index + 2}`)].join(',');
        const q = `UPDATE user_credential SET ${setValues} WHERE user_id=$1 RETURNING *;`;
        return await postgresQueryHelper(q, "Internal server error, failed to update user credentials, userCredentialModel.js file", [userId, ...values]);
    }
}