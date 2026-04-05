import { sendEmail } from './sendEmailService.js';
const emailSender = process.env.EMAIL_SENDER;

export const emailToken = async (email, token) => {
    const emailRecipient = {
        subject: 'Token',
        html: `<Button 
                style="
                font-weight: bold;
                background-color: #ffffff; 
                padding: 10px; 
                text-align: center;
                text-decoration: none;
                color: #000;
                border-radius: 5px;
                "
                >
                ${process.env.URL}users/verify?token=${token}
                </Button>`
    }
    await sendEmail(emailSender, email, emailRecipient);
}
