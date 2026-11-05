import EmailService from "../notification/email/emailService.js";
import EmailTemplate from "../notification/email/emailTemplate.js";

const emailService = new EmailService();
const emailTemplate = new EmailTemplate();

// the function which sends the email verification message
export async function sendEmailVerificationService(user, token) {
    try {
        const verificationUrl = `${process.env.CLIENTURL}/user/auth/verifyEmail?type=email&&token=${token}`;
        const message = emailTemplate.emailVerification({ firstName: user.first_name, verificationUrl: verificationUrl });
        return await emailService.sendEmail({ to: user.email, ...message });
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to send the verification email, notificationService.js file", errorDetails: error } };
    }
}

// the function which sends the notification to email for password change
export async function sendPasswordChangeNotificationService(ip, user, token) {
    try {
        const resetUrl = `http://${ip}:${process.env.APP_PORT}/auth/forgotPassword?token=${token}`;
        const message = emailTemplate.passwordChangeNotification({ firstName: user.first_name, resetUrl: resetUrl });
        return await emailService.sendEmail({ to: user.email, ...message });
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to send the password change notification email, notificationService.js file", errorDetails: error } };
    }
}

// the function which sends the phone verification message
export async function sendPhoneVerificationService(user, otp) {
}