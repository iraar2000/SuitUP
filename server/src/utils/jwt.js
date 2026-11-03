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

// verify the the refresh token
export function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

// verify the the access token
export function verifyAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}