import { response } from "express";
import UserRolesModel from "../../model/user/userRolesModel.js";
import UserSession from "../../model/user/userSessionModel.js";
import { createAccessToken, createRefreshToken } from "../../utils/jwt.js";

const userSession = new UserSession();
const userRole = new UserRolesModel();

// the function which is used to create userSession
export async function createAccountSessionService(userId, ipAddress) {
    try {
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        // create the session
        const session = await userSession.createUserSession([userId, null, ipAddress, expiresAt]);
        if (session.status !== 200) return session;

        // retrieve the user role
        const role = await userRole.retrieveUserRoles(userId);
        if (role.status !== 200) return role;

        // create the jwt token
        const payload = {
            uid: userId,
            sid: session.data.id,
            type: role.data.name
        }

        // creating the tokens
        const accessToken = createAccessToken(payload);
        const refreshToken = createRefreshToken(payload);

        // create the session
        const updateSession = await updateAccountSessionService(session.data.id, ['refresh_token_hash'], [refreshToken]);
        if (updateSession.status !== 200) return { status: 500, data: { error: "Internal server error, failed to create session token, sessionService.js file", errorDetails: error } }

        return { status: 200, data: { accessToken: accessToken, refreshToken: refreshToken } }
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal server error, failed to create user session, sessionService.js file", errorDetails: error } };
    }
}

// the function which is used to update the userSession 
export async function updateAccountSessionService(sessionId, keys, values) {
    try {
        return await userSession.updateUserSession(sessionId, keys, values);
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal server error, failed to update the account sessions, sessionService.js file", errorDetails: error } };
    }
}

// the function which is used to get the userSession by refresh token
export async function retrieveAccountSessionByTokenService(refreshToken) {
    try {
        const session = await userSession.retrieveUserSessionByToken(refreshToken);
        if (session.status !== 200) return session;

        // retrieve the user role
        const role = await userRole.retrieveUserRoles(session.data.user_id);
        if (role.status !== 200) return role;

        return { status: 200, data: { role: role.data.name, ...session.data } }
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve session by token, sessionService.js file", errorDetails: error } };
    }
}

// the function which is used to get the userSession by user id
export async function retrieveAccountSessionByUserIdService(userId) {
    try {
        const session = await userSession.retrieveUserSessionByUserId(userId);
        if (session.status !== 200) return session;
        // retrieve the user role
        const role = await userRole.retrieveUserRoles(session.data.user_id);
        if (role.status !== 200) return role;
        return { status: 200, data: { role: role.data.name, ...session.data } }
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve session by user id, sessionService.js file", errorDetails: error } };
    }
}

// the function which is used to retrieve the session by user id with unrevoked session
export async function retrieveUnrevokedAccountSessionByUserIdService(userId) {
    try {
        const session = await userSession.retrieveUnrevokedUserSessionByUserId(userId);
        if (session.status !== 200 || !session.data) return session;

        // check if the session is revoked
        if (session.data.revoked_at) return { status: 400, data: { error: "Session is revoked!" } }

        // retrieve the user role
        const role = await userRole.retrieveUserRoles(session.data.user_id);
        if (role.status !== 200) return role;

        return { status: 200, data: { role: role.data.name, ...session.data } }
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve unrevoked session by user id, sessionService.js file", errorDetails: error } };
    }
}
