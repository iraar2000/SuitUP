import { postgresQueryHelper } from "../../utils/postgresHelperFunctions"

// the class which controlls the sessions of the user
export default class UserSession {
    constructor() { }

    // the function which helps to create the user session
    async createUserSession(sessionData) {
        const q = `
            INSERT INTO user_session(user_id, refresh_token_hash, ip_address, expire_at)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `
        return await postgresQueryHelper(q, "Internal server error, failed to create user session, userSessionModel.js file", [...sessionData]);
    }
}