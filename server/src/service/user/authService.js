import UserCredential from "../../model/user/userCredentialModel.js";
import { createAccessToken } from "../../utils/jwt.js";
import { verifyPassword } from "../../utils/password.js";
import { createAccountSessionService, retrieveAccountSessionByTokenService, retrieveAccountSessionByUserIdService, retrieveUnrevokedAccountSessionByUserIdService, updateAccountSessionService } from "./sessionService.js";
import { retrieveAccountService } from "./userService.js";

const userCredentialModel = new UserCredential();

// the function which is used to login account
export async function loginAccountService(accountData) {
    try {
        // create the login history

        // retrieve the account
        const account = await retrieveAccountService(accountData);
        if (account.status !== 200) return account;

        // check if the account is already in session
        var session = await retrieveUnrevokedAccountSessionByUserIdService(account.data.id);
        if (session.status === 200 && session.data && !session.data.revoked_at) return { status: 400, data: { error: "Account is already in session!" } }

        // retrieve the account credentials
        const accountCredential = await userCredentialModel.retrieveUserCredentials(account.data.id);
        if (account.status !== 200) return accountCredential;
        console.log(accountCredential.data.pass_hash, accountData.password);

        // verify the credential password
        const passVerify = await verifyPassword(accountCredential.data.pass_hash, accountData.password);
        console.log(passVerify);

        // if the account is not verified then return the not auth error
        if (!passVerify) return { status: 401, data: { error: "Unauthorised, Invalid email or password!" } }

        // creating the session
        session = await createAccountSessionService(account.data.id, "123.132.21.23");
        if (session.status !== 200) return session;

        return { status: 200, data: { ...session.data, profile: account.data } };
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal server error, failed to login in to the account, authService.js file", errorDetails: error } };
    }
}

// the function which is used to logout and terminate the user session
export async function logoutAccountService(refreshToken) {
    try {
        // retrieve the session by refresh token
        const session = await retrieveAccountSessionByTokenService(refreshToken);
        if (session.status !== 200) return session;

        // check if the session is already revoked
        if (session.data.revoked_at) return { status: 400, data: { error: "Session is already revoked!" } }

        // revoke the session
        const revokeSession = await updateAccountSessionService(session.data.id, ['revoked_at'], [new Date()]);
        if (revokeSession.status !== 200) return revokeSession;

        return { status: 200, data: { message: "Session terminated successfully." } };
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to logout the account, authService.js file", errorDetails: error } };
    }
}

// referesh login
export async function refreshLoginService(refreshToken) {
    try {
        const response = await retrieveAccountSessionByTokenService(refreshToken);
        if (response.status !== 200) return response;

        // Check expiration
        console.log("Session expires at:", response.data);
        if (new Date(response.data.expire_at) <= new Date()) return { status: 401, data: { error: "Session has expired." } }

        // Create a new access token
        const payload = {
            uid: response.data.user_id,
            sid: response.data.id,
            type: response.data.role
        }

        const accessToken = createAccessToken(payload);
        return { status: 200, data: { accessToken: accessToken } };
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal server error, failed to refresh the login with new access token, authService.js file", errorDetails: error } };
    }
}