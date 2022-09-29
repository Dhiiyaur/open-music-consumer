const nodemailer = require('nodemailer');

class MailSender {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD,
            },

        });
    }

    sendMail = (targetEmail, content) => {
        const message = {
            from: 'Open music Apps',
            to: targetEmail,
            subject: 'Export Playlist',
            text: 'Terlampir hasil dari export playlist',
            attachments: [
                {
                    filename: 'playlist.json',
                    content,
                },
            ],
        };

        return this.transporter.sendMail(message);
    };
}

module.exports = MailSender;
