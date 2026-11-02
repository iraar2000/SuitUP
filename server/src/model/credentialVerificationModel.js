import { postgresQueryHelper } from "../utils/postgresHelperFunctions.js"

export default class CredentialVerification {
    constructor() { }

    // the function which creates the credential verification
    async createCredentialVerification(credVerData) {
        const q = `
            INSERT INTO credential_verification(user_id, token_hash, expire_at, credential_type)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `
        return await postgresQueryHelper(q, "Internal server error, failed to create the credential verification, credentialVerificationModel.js file", [...credVerData])

    }

    // the function which is used to update the credential verification
    async updateCredentialVerification(value) {
        const q = `UPDATE credential_verification SET verified_at=$1 WHERE id=$2 RETURNING *;`;
        return await postgresQueryHelper(q, "Internal server error, failed to update credential verification, credentialVerificationModel.js file", [...value]);
    }

    // the function checks if the verification entry exists
    async retrieveCredentialVerification(data) {
        const q = `
            SELECT *
            FROM credential_verification
            WHERE token_hash = $1
                AND credential_type = $2
                AND expire_at > CURRENT_TIMESTAMP;
            `;
        const response = await postgresQueryHelper(q, "Internal server error, failed to check is credential exists, credentialVerificationModel.js file", [...data]);
        if (response.status !== 200) return response;
        return { status: 200, data: response.data[0] };
    }
}