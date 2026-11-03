import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js"

// the class which controlls the sessions of the user
export default class UserSession {
    constructor() { }

    // the function which helps to create the user session
    async createUserSession(sessionData) {
        const q = `
            INSERT INTO user_session(user_id, refresh_token_hash, ip_address, expire_at)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `
        const response = await postgresQueryHelper(q, "Internal server error, failed to create user session, userSessionModel.js file", [...sessionData]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }

    // the function which helps to update the user session
    async updateUserSession(sessionId, keys, values) {
        const setClause = keys
            .map((key, index) => `${key}=$${index + 1}`)
            .join(", ");

        const q = `
            UPDATE user_session
            SET ${setClause}
            WHERE id=$${values.length + 1};`;

        const response = await postgresQueryHelper(q, "Internal server error, failed to update the user session, userSessionModel.js file", [...values, sessionId]);
        if (response.status !== 200) return response;
        return { status: 200, data: response.data[0] };
    }

    // the function which helps to retrieve the user session by refresh token
    async retrieveUserSessionByToken(refreshToken) {
        const q = `SELECT * FROM user_session WHERE refresh_token_hash=$1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve user session by refresh toke, userSessionModel.js file", [refreshToken]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function which helps to retrieve the user session by user id
    async retrieveUserSessionByUserId(userId) {
        const q = `SELECT * FROM user_session WHERE user_id=$1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve user session by user id, userSessionModel.js file", [userId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function which helps to retrieve the unrevoked user session by user id
    async retrieveUnrevokedUserSessionByUserId(userId) {
        const q = `SELECT * FROM user_session WHERE user_id=$1 AND revoked_at IS NULL;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve unrevoked user session by user id, userSessionModel.js file", [userId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }
}