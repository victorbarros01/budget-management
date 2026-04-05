import mailjet from 'node-mailjet';
const mailjetConnect = mailjet.apiConnect(
    process.env.SEND_EMAILAPI,
    process.env.SEND_EMAILAPI_SECRETKEY
);

export const sendEmail = async (from, to, content = { subject: 'Email de teste', html: '<h3 style="color: blue;">Olá, este é um email de teste.</h3>' }) => {
    const request = mailjetConnect.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: from,
                    Name: 'Budget Management'
                },
                To: [
                    {
                        Email: to,
                        Name: 'User'
                    }
                ],
                Subject: content.subject,
                HTMLPart: content.html
            }
        ]
    });
}