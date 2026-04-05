import mailjet from 'node-mailjet';
import axios from 'axios';
import 'dotenv/config';
const mailjetConnect = mailjet.apiConnect(
    process.env.SEND_EMAILAPI,
    process.env.SEND_EMAILAPI_SECRETKEY
);

const token = Math.floor(Math.random()*(999999-0)+0);


const sendEmail = async (emailSender, emailRecipient) => {
    const request = mailjetConnect.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: emailSender,
                    Name: 'Budget Management'
                },
                To: [
                    {
                        Email: emailRecipient,
                        Name: 'User'
                    }
                ],
                Subject: 'Teste de envio de email',
                HTMLPart: `<Button 
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
        ]
    });

    return request;
}

await sendEmail(process.env.EMAIL_SENDER, 'linsjones8@gmail.com')

