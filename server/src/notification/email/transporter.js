import nodemailer from 'nodemailer'
import dotenv from "dotenv";

// the xampp road 
dotenv.config();

//  the mail transporter
export const transporter = nodemailer.createTransport({
    host: process.env.SMTPHOST,
    port: Number(process.env.SMTPPORT),
    secure: process.env.SMTPSECURE === "true",
    auth: {
        user: process.env.SMTPUSER,
        pass: process.env.SMTPPASS,
    },
})