import { createHash, randomBytes } from 'node:crypto'
import argon from 'argon2'

// the function creates the update keys and values of the passed in object
export function createDynamicKeysAndValuesUtil(dataObject) {
    const values = [];
    const keys = [];
    for (const [key, value] of Object.entries(dataObject)) {
        if (!value && value !== 0) continue; // the value must not be undefined or null

        // appending the data in the list
        values.push(value);
        keys.push(`${key}=$${values.length}`);

    }

    return [values, keys];
}

// the hash type
export const HASH_TYPES = Object.freeze({
    PLAIN: "plain",
    HMAC: "hmac",
    JWT: "jwt",
    ARGON: "argon",
    TOKEN: "token",
    OTP: 'otp'
});

// the function which generates the hash for strings
export async function createHashUtil({ data = '', type = HASH_TYPES.PLAIN, key = null }) {
    switch (type) {
        case HASH_TYPES.ARGON: return await argon.hash(data);
        case HASH_TYPES.PLAIN: return createHash("sha256").update(data).digest("hex");
        case HASH_TYPES.TOKEN:
            const token = randomBytes(32).toString('hex');
            const tokenHash = createHash('sha256').update(token).digest("hex");
            const expire_at = new Date(Date.now() + 24 * 60 * 60 * 1000);
            return { token, tokenHash, expire_at }
        case HASH_TYPES.OTP:
            const otp = randomBytes(6).toString('hex');
            const otpHash = createHash('sha256').update(token).digest("hex");
            expire_at = new Date(Date.now() + 24 * 60 * 60 * 1000);
            return { otp, otpHash, expire_at }
        case HASH_TYPES.HMAC:
            if (!key) throw new Error("HMAC requires a secret key.");
            return crypto.createHmac("sha256", key).update(data).digest("hex");
        case HASH_TYPES.JWT: throw new Error("JWTs are signed with jsonwebtoken, not crypto.createHash().");
        default: throw new Error(`Unknown hash type: ${type}`);
    }
}
