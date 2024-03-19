import nodemailer from 'nodemailer';
const sendEmail=async function(email,subject,mesage){
    let transporter=nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,
    auth:{
        user:process.env.SMTP_USERNAME,
        pass:process.env.SMTP_PASSWORD,
    },
});
await transporter.sendMail({
    form:process.env.SMTP_FROM_EMAIL,
    to:email,
    subject:subject,
    html:MessageChannel,
});
};