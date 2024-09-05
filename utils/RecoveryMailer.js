const nodemailer = require('nodemailer');
const dotenv =require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({

        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "sillogicsolutions@gmail.com",
            pass: process.env.APP_PASSWORD,
        },
    tls: {
        rejectUnauthorized: false
    }
});

const RecoveryMailer = async(email, tempPass)=>{

    const info = transporter.sendMail({

        from: '"Sillogic Solutions" <sillogicsolutions@gmail.com>',
        to: email,
        subject: "Password Recovery",
        html: `<h3>Password Recovery</h3> <p>Here is your One-Time Temporary Password to log into your account: </p> <strong>${tempPass}</strong>`,
    })

}

module.exports= RecoveryMailer;