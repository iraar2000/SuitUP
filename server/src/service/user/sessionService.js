import UserSession from "../../model/user/userSessionModel.js";
import { createAccessToken, createRefreshToken } from "../../utils/jwt.js";

const userSession = new UserSession();

// the function which is used to create userSession
export async function createAccountSessionService(userId, ipAddress) {
    try {
        // create the session
        const session = await userSession.createUserSession([userId, null, ipAddress, expiresAt]);

        // create the jwt token
        const payload = {
            uid: userId,
            sid: session.id,
        }
        const accessToken = createAccessToken({});
        const refreshToken = createRefreshToken({});
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        return
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create user session, userService.js file", errorDetails: error } };
    }
}

// the function which is used to update the userSession 
export async function updateAccountSessionService() {
}
