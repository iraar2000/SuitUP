import CredentialVerification from "../model/credentialVerificationModel.js";
import UserCredential from "../model/userCredentialModel.js";
import UserModel from "../model/userModel.js";
import { sha256 } from "../utils/hash.js";
import { createOtp } from "../utils/otp.js";
import { hashPassword } from "../utils/password.js";
import { createVerificationToken } from "../utils/token.js";
import { sendEmailVerificationService, sendPhoneVerificationService } from "./notificationService.js";

const userModel = new UserModel();
const userCredentialModel = new UserCredential();
const credVerificationModel = new CredentialVerification();

// the function which is used to create the user account for signup
export async function createAccountService(userData) {
    try {
        // first create the user data
        const rUser = await userModel.createUser([userData.firstName, userData.lastName, userData.userName, userData.phone, userData.email, userData.address, userData.location[0], userData.location[1]]);
        if (rUser.status !== 200) return rUser;

        // generate the hash of the password
        const passHash = await hashPassword(userData.password);

        // create user credentials
        const rUserCred = await userCredentialModel.createUserCredentials(rUser.data.id, passHash);
        if (rUserCred.status !== 200) return rUserCred;

        return rUser;
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, Failed to create the user account, userService.js file", errorDetails: error } };
    }
}

// the function which is used to verify the user account
export async function verifyAccountService(token, type) {
    try {
        const tokenHash = sha256(token);
        const credVer = await credVerificationModel.retrieveCredentialVerification([tokenHash, type]);
        console.log(credVer, tokenHash, type);
        if (credVer.status !== 200) return credVer;
        if (!credVer.data) return { status: 404, data: { error: "Credential does not exist, failed to verify credentials!" } };

        // then update the credential if it exists
        const response = await credVerificationModel.updateCredentialVerification([(new Date(Date.now())), credVer.data.id]);
        if (response.status !== 200) return response;
        else return { status: 200, data: { message: "Updated the credential verification!" } };
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to verify the user account, userService.js file", errorDetails: error } };
    }
}

// the function is used to retrieve the account
export async function retrieveAccountService() { }

// the function is used to edit the account
export async function editAccountService() { }

// the function is used to remove the account
export async function removeAccountService() { }

// the function which is used to create the user oauth account for signup
export async function createOauthAccountService() { }

// the function is used to retrieve oauth account
export async function retrieveOauthAccountService() { }

// the function is used to edit the account
export async function editOauthAccountService() { }

// the function is used to remove the account
export async function removeOauthAccountService() { }

// the function is used to create the roles
export async function createRoleService() { }

// the function is used to create the roles
export async function retrieveRoleService() { }

// the function is used to create the roles
export async function editRoleService() { }

// the function is used to create the roles
export async function removeRoleService() { }

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