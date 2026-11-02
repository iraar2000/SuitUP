import { createAccountService, createCredentialVerificationService, verifyAccountService } from "../service/userService.js";

// the function which controlls the account creation
export async function createAccountController(req, res) {
    try {
        // create the account
        const response = await createAccountService(req.body);

        // create the verification
        await createCredentialVerificationService(response.data);

        return res.status(response.status).json({ userData: response.data, message: "Verify the account!" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, Failed to create account, userController.js file", errorDetails: error });
    }
}

// the function which controlls the account verification
export async function verifyAccountController(req, res) {
    try {
        const { token, type } = req.query;
        const response = await verifyAccountService(token, type);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to verify the account, userController.js file", errorDetails: error });
    }
}

