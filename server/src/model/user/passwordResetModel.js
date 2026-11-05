import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

// the class which is used to handle the password reset model
export default class PasswordResetModel {
    constructor() { }

    // the function which is used to create the password reset token
    async createPasswordReset(passResetData) {
        console.log(passResetData);
        const q = `INSERT INTO password_reset(user_id, token_hash, expire_at, used_at) VALUES($1, $2, $3, $4) RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to create password reset, passwordRestModel.js file", [...passResetData]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }

    // check if there is an active password reset
    async retrieveUserActivePasswordReset(userId) {
        const q = `SELECT * FROM password_reset WHERE user_id=$1 AND expire_at>CURRENT_TIMESTAMP AND used_at IS NULL;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve active users password reset, passworsResetModel.js file", [userId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }

    // retrieve the password reset which is still active
    async retrieveUserActivePasswordResetByToken(token) {
        const q = `SELECT * FROM password_reset WHERE token_hash=$1 AND expire_at > CURRENT_TIMESTAMP AND used_at IS NULL;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve pass reset by token, passwordResetModel.js file", [token]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function is used to update the password reset
    async updatePasswordResetByToken(token, keys, values) {
        const setValues = [...keys.map((key, index) => `${key}=$${index + 2}`)].join(',');
        const q = `UPDATE password_reset SET ${setValues} WHERE token_hash=$1 RETURNING *;`;
        return await postgresQueryHelper(q, "Internal server error, failed to update the password reset, passwordResetModel.js file", [token, ...values])
    }
}