import { createHash, createHmac } from "node:crypto";

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