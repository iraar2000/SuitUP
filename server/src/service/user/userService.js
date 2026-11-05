import UserCredential from "../../model/user/userCredentialModel.js";
import UserModel from "../../model/user/userModel.js";
import { hashPassword } from "../../utils/password.js";

const userModel = new UserModel();
const userCredentialModel = new UserCredential();

// the function which is used to create the user account for signup
export async function createAccountService(userData) {
    try {
        // first create the user data
        const rUser = await userModel.createUser([userData.firstName, userData.lastName, userData.userName, userData.phone, userData.email, userData.address, userData.location[0], userData.location[1]]);
        if (rUser.status !== 200) return rUser;

        // create user credentials
        const rUserCred = await updateUserCredentialsService(rUser.data.id, userData.password)
        if (rUserCred.status !== 200) return rUserCred;

        return rUser;
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, Failed to create the user account, userService.js file", errorDetails: error } };
    }
}

// the function is used to retrieve the account
export async function retrieveAccountService(accountData) {
    try {
        switch (accountData.type) {
            case "email": return userModel.retrieveUserByEmail(accountData.email);
            case "phone": return userModel.retrieveUserByPhone(accountData.phone);
            case "id": return userModel.retrieveUserById(accountData.userId);
            default: return { status: 200, data: { message: "Retrieve account by email, phone or userId" } };
        }
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve account from database, userService.js file", errorDetails: error } };
    }
}

// the function is used to retrieve the account by email
export async function retrieveAccountByEmailService(email) {
    try {
        return await userModel.retrieveUserByEmail(email);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve account by email from database, userService.js file", errorDetails: error } };
    }
}

// the function is used to update user credentials
export async function updateUserCredentialsService(userId, keys, values) {
    try {
        // create user credentials
        return await userCredentialModel.updateUserCredentials(userId, keys, values);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to update user credentials, userService.js file", errorDetails: error } };
    }
}

// the function is used to update user credentials
export async function createUserCredentialsService(userId, password) {
    try {
        // generate the hash of the password
        const passHash = await hashPassword(password);

        // create user credentials
        return await userCredentialModel.createUserCredentials(userId, passHash);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to update user credentials, userService.js file", errorDetails: error } };
    }
}

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
