import { generateRandomHash, sha256 } from "./hash.js";

export function createVerificationToken(expiresIn = 24 * 60 * 60 * 1000) {
    const token = generateRandomHash();
    return {
        token,
        tokenHash: sha256(token),
        expiresAt: new Date(Date.now() + expiresIn)
    };
}