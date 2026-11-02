import UserCredential from "../../model/user/userCredentialModel.js";
import { verifyPassword } from "../../utils/password.js";
import { retrieveAccountService } from "./userService.js";

const userCredentialModel = new UserCredential();

// the function which is used to register account
export async function registerAccountService() {

}

// the function which is used to login account
export async function loginAccountService(accountData) {
    try {
        // retrieve the account
        const account = await retrieveAccountService(accountData);
        if (account.status !== 200) return account;

        // retrieve the account credentials
        const accountCredential = await userCredentialModel.retrieveUserCredentials(account.data.id);
        if (account.status !== 200) return accountCredential;

        // verify the credential password
        const passVerify = await verifyPassword(accountCredential.data.pass_hash, accountData.password);

        // if the account is not verified then return the not auth error
        if (!passVerify) return { status: 401, data: { error: "Unauthorised, Invalid email or password!" } }


        return { status: 200, data: { accessToken: accessToken, refreshToken: refreshToken, profile: account } };
    } catch (error) {
        console.log(error);
        return { status: 500, data: { error: "Internal server error, failed to login in to the account, userService.js file", errorDetails: error } };
    }
}