import nodemailer, {TransportOptions, Transport} from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

class MailService {
    transporter
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_APP_PSW,
            } 
        } as TransportOptions)
    }
    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: "gvinpin",
            to,
            subject: `Confirm your account on ${process.env.API_URL}`,
            text: '',
            html: 
            `
                <div>
                    <p>Thanks for signing up with ${process.env.API_URL}! You must follow this link within 30 days of registration to activate your account:</p>
                    <a href=${link}>${link}</a>
                </div>
            `
        })
    }
}

export default new MailService();