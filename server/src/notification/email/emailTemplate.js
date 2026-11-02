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
}