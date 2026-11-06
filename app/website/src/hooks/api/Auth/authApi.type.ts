// the account type data
export type AccountType = {
    id?: number,
    first_name?: string,
    last_name?: string,
    username?: string,
    phone?: string,
    email?: string,
    address?: string,
    location?: [number, number],
    create_at?: string,
    update_at?: string
}

// the create accoount response
export type ResponseType = {
    userData?: AccountType,
    message?: string,
    accessToken?: string
}

// the registration props of the account
export interface RegisterAccoutProps {
    firstName?: string,
    lastName?: string,
    userName?: string,
    phone?: string,
    email?: string,
    address?: string,
    location?: [number, number],
    password?: string
}

// the login props of the account
export interface LoginAccountProps {
    email?: string,
    password?: string,
    type?: string,
    message?: string
}
