import PasswordResetModel from "../../model/user/passwordResetModel.js";
import { generateRandomHash, sha256 } from "../../utils/hash.js";
import { hashPassword } from "../../utils/password.js";
import { sendPasswordChangeNotificationService } from "../notificationService.js";
import { retrieveAccountByEmailService, updateUserCredentialsService } from "./userService.js";

const passResetModel = new PasswordResetModel();

// the function which is used when the password was forgotten
export async function forgotPasswordService(ip, email) {
    try {
        // retrieve the account by email
        const account = await retrieveAccountByEmailService(email);
        if (account.status !== 200 || !account.data) return { status: 404, data: { error: "Account not found." } };

        // find if there exists and active password reset
        let passReset = await passResetModel.retrieveUserActivePasswordReset(account.data.id);
        if (passReset.status !== 200) return passReset;

        // create the password reset
        if (passReset.status === 200 && !passReset.data) {
            // creating the password reset entry
            const expireAt = new Date(Date.now() + 60 * 60 * 1000);
            const token = generateRandomHash();
            passReset = await passResetModel.createPasswordReset([account.data.id, token, expireAt, null])
        }

        // send the email for password reset link
        await sendPasswordChangeNotificationService(ip, account.data, passReset.data.token_hash);

        return { status: 200, data: { message: "Password reset link sent to email." } };
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal server error, failed to process forgot password request, passwordService.js file", errorDetails: error } };
    }
}

// the function which is used to reset the password
export async function resetPasswordService(userId, oldPassword, newPassword) {
    try {

    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to reset password, passwordService.js file", errorDetails: error } };
    }
}

// the function which is used to change the password
export async function changePasswordService(email, newPassword, token) {
    try {
        // get the password reset with the token
        const passResp = await passResetModel.retrieveUserActivePasswordResetByToken(token);
        if (passResp.status !== 200) return passResp;
        if (passResp.status === 200 && !passResp.data) return { status: 404, data: { error: "Token seem to be used or it have expired, rerequest the change of password!, passwordService.js file" } }

        // update the password reset token to used 
        await passResetModel.updatePasswordResetByToken(token, ['used_at'], [(new Date(Date.now()))]);

        // get user by email
        const accResp = await retrieveAccountByEmailService(email);
        if (accResp.status !== 200) return accResp;

        // check if the the account and passReset id are the same
        if (passResp.data.user_id === accResp.data.id) return { status: 404, data: { message: "Failed to change password, something is wrong. token expired or wrong email!" } };

        // then change the password if everything is okay;
        const passHash = await hashPassword(newPassword);
        return await updateUserCredentialsService(accResp.data.id, ['pass_hash'], [passHash]);

    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to change password, passwordService.js file", errorDetails: error } };
    }
}