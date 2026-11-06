import { useState } from "react";
import { apiClient } from "../https";
import type { AccountType, LoginAccountProps, RegisterAccoutProps, ResponseType } from "./authApi.type";

export function useUserAuthApi() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<AccountType | null>(null);
    const [error, setError] = useState<string | null>(null);

    // the function which registers an account
    async function registerAccount(accountData: RegisterAccoutProps) {
        try {
            setLoading(true);
            setError(null);

            const response = await apiClient.post<ResponseType>("/user/auth/createAccount", accountData);
            const userData = response.data.userData as AccountType;

            setUsers(userData);
            return { users: userData, error: null };

        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || "Failed to create account!";
            setError(message);
            return { users: null, error: message };

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
            const userData = response.data.userData as AccountType;

            // setting the access token to the localStorage
            localStorage.setItem('accessToken', response.data.accessToken!)

            setUsers(userData);
            return { users: userData, error: null };

        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || "Failed to login the account!";
            setError(message);
            return { users: null, error: message };

        } finally {
            setLoading(false);
        }
    }

    // the function which is used for forgot password of an account
    async function forgotAccount(email: string) {
        try {
            setLoading(true);
            setError(null);

            const response = await apiClient.post<ResponseType>("/user/auth/forgotPassword", { email });
            console.log(response);

            return { error: null };
        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || "Failed to login the account!";
            setError(message);
            return { users: null, error: message };

        } finally {
            setLoading(false);
        }
    }

    return { registerAccount, loginAccount, forgotAccount, loading, users, error };
}