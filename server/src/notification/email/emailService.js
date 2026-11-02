import { transporter } from "./transporter.js";

// the email service class
export default class EmailService {
    constructor() { }

    // the function is used to send email
    async sendEmail(options) {
        try {
            return await transporter.sendMail({ from: process.env.SMTPFROM, ...options });
        } catch (error) {
            return { status: 500, data: { error: "Internal server error, failed to send verification, emailService.js file", errorDetails: error } };
        }
    }
}