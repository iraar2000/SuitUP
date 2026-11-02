import jwt from "jsonwebtoken";

// creating the access token
export function createAccessToken(payload) {
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m",
            issuer: "SuitUp",
            audience: "SuitUpClient"
        }
    );
}

// creating the refresh token
export function createRefreshToken(payload) {
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "30d",
            issuer: "SuitUp",
            audience: "SuitUpClient"
        }
    );
}