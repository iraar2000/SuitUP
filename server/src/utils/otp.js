import { randomInt } from "node:crypto";
import { sha256 } from "./hash.js";

// creating the otp
export function createOtp(length = 6, expiresIn = 10 * 60 * 1000) {
    const max = 10 ** length;
    const otp = randomInt(0, max)
        .toString()
        .padStart(length, "0");

    return {
        otp,
        otpHash: sha256(otp),
        expiresAt: new Date(Date.now() + expiresIn)
    };
}