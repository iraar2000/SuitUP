// the email template
export default class EmailTemplate {
    constructor() { }

    // the function which creates the verification email
    emailVerification({ firstName, verificationUrl }) {
        return {
            subject: "Verify your suitup account!",
            html: `
                <h2>Hello ${firstName}</h2>
                <p>Please verify your email.</p>
                <a href="${verificationUrl}">Verify Email</a>
                `,
            text: `
                Hello ${firstName}
                Verify your email: ${verificationUrl}
                `
        }
    }

    // the function which allows the user to change the password
    passwordChangeNotification({ firstName, resetUrl }) {
        return {
            subject: "You requested a password change!",
            html: `
                <h2>Hello ${firstName}</h2>
                <p>You can follow the link and change your password.</p>
                <a href="${resetUrl}">Change Password</a>
                <p>Note: If you did not request a password change, please ignore this email.</p>
                `,
            text: `
                Hello ${firstName}
                You can follow the link and change your password: ${resetUrl}
                `
        }
    }
}