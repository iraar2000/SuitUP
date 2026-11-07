import { useState } from "react";
import { apiClient } from "../https";
import type { ChangeAccountPasswordProps, ForgotAccountPasswordProps, LoginAccountProps, RegisterAccoutProps, ResponseType } from "./authApi.type";

export function useUserAuthApi() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<ResponseType | null>()
    const [error, setError] = useState<string | null>(null);

    // the function which registers an account
    async function registerAccount(accountData: RegisterAccoutProps) {
        try {
            setLoading(true);
            setError(null);

            const response = await apiClient.post<ResponseType>("/user/auth/createAccount", accountData);

            setResponse(response.data);
            return { response, error: null };

        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || "Failed to create account!";
            setError(message);
            return { response: null, error: message };
        } finally {
            setLoading(false);
        }
    }

    // the function which used to login an account
    async function loginAccount(loginData: LoginAccountProps) {
        try {
            setLoading(true);
            setError(null);

            const response = await apiClient.post<ResponseType>("/user/auth/loginAccount", loginData);

            // setting the access token to the localStorage
            localStorage.setItem('accessToken', response.data.accessToken!)

            setResponse(response.data);
            return { response, error: null };

        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || "Failed to login the account!";
            setError(message);
            return { response: null, error: message };

        } finally {
            setLoading(false);
        }
    }

    // the function which is used for forgot password of an account
    async function forgotAccountPassword({ email }: ForgotAccountPasswordProps) {
        try {
            setLoading(true);
            setError(null);

            const response = await apiClient.post<ResponseType>("/user/auth/forgotPassword", { email });
            setResponse(response.data);

            return { response, error: null };
        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || "Failed to login the account!";
            setError(message);
            return { response: null, error: message };

        } finally {
            setLoading(false);
        }
    }

    // the function which is used to changing the account password
    async function changeAccountPassword(changeData: ChangeAccountPasswordProps) {
        try {
            setLoading(true);
            setError(null);

            const response = await apiClient.put<ResponseType>("/user/auth/changePassword", changeData);
            setResponse(response.data);

            return { response, error: null };
        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || "Failed to login the account!";
            setError(message);
            return { response: null, error: message };

        } finally {
            setLoading(false);
        }
    }

    return { registerAccount, loginAccount, forgotAccountPassword, changeAccountPassword, loading, response, error };
}