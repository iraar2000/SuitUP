import { createHash, createHmac, randomBytes } from "node:crypto";

// the function hasher 256
export function sha256(data) {
    return createHash("sha256")
        .update(data)
        .digest("hex");
}

// the function mac hasher 256
export function hmacSha256(data, secret) {
    return createHmac("sha256", secret)
        .update(data)
        .digest("hex");
}

// the function generate random hash
export function generateRandomHash(length = 32) {
    return randomBytes(length).toString("hex");
}