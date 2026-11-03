import CredentialVerification from "../../model/user/credentialVerificationModel.js";
import { sha256 } from "../../utils/hash.js";
import { createOtp } from "../../utils/otp.js";
import { createVerificationToken } from "../../utils/token.js";
import { sendEmailVerificationService, sendPhoneVerificationService } from "../notificationService.js";

const credVerificationModel = new CredentialVerification();

// the function which generates the verification
export async function createCredentialVerificationService(userData) {
    try {
        let val = "", valHash = "", expire = "";
        if (userData.email) {
            ({ token: val, tokenHash: valHash, expiresAt: expire } = createVerificationToken());
            await sendEmailVerificationService(userData, val);
        } else if (userData.phone) {
            ({ otp: val, otpHash: valHash, expiresAt: expire } = createOtp(6));
            await sendPhoneVerificationService(userData, val);
        }
        const response = await credVerificationModel.createCredentialVerification([userData.id, valHash, expire, userData.email ? 'email' : 'mobile']);
        return response;
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create credential verification, userService.js file", errorDetails: error } };
    }
}

// the function which is used to verify the user account
export async function verifyAccountService(token, type) {
    try {
        const tokenHash = sha256(token);
        const credVer = await credVerificationModel.retrieveCredentialVerification([tokenHash, type]);
        if (credVer.status !== 200) return credVer;
        if (!credVer.data) return { status: 404, data: { error: "Credential does not exist, failed to verify credentials!" } };

        // then update the credential if it exists
        const response = await credVerificationModel.updateCredentialVerification([(new Date(Date.now())), credVer.data.id]);
        if (response.status !== 200) return response;
        else return { status: 200, data: { message: "Updated the credential verification!" } };
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal server error, failed to verify the user account, verificationService.js file", errorDetails: error } };
    }
}