const router = require("express").Router();
const Email = require("../models/Email");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SEND_API_KEY);

const userSendMail = (email, name, content) => {

    const message = {
        from: {
            name: "差出人",
            email: process.env.EMAIL_FROM
        },
        to: {
            name: "宛先",
            email: email
        },
        subject: "お問い合わせありがとうございます。",
        text: [
            `${name}様`,
            "",
            "内容確認の上、ご連絡を致しますので、今しばらくお待ちくださいませ。",
            "3日経っても返事がない場合、申し訳ありませんが再度ご連絡ください。",
            "",
            "===================================",
            "",
            `お名前：${name}`,
            `メールアドレス：${email}`,
            `内容`,
            content,
            "",
            "===================================",
            "",
            "○●-----------------------●○",
            "",
            "Webエンジニア",
            "岡田　茂之",
            "okada shigeyuki",
            "",
            "info_os-create@os-create.com",
            "",
            "○●-----------------------●○",
        ].join("\n"),
    }

    return message;
}

const adminSendMail = (email, name, content) => {

    const message = {
        from: {
            name: "差出人",
            email: process.env.EMAIL_FROM
        },
        to: {
            name: "宛先",
            email: process.env.EMAIL_TO_QQA
        },
        subject: "os-createからお問い合わせがありました。",
        text: [
            `${name}様から以下お問い合わせがありました。`,
            "",
            "内容確認の上、ご連絡を致しますので、今しばらくお待ちくださいませ。",
            "3日経っても返事がない場合、申し訳ありませんが再度ご連絡ください。",
            "",
            "===================================",
            "",
            `お名前：${name}`,
            `メールアドレス：${email}`,
            `内容`,
            content,
            "",
            "===================================",
            "",
            "○●--------------------------------●○",
            "",
            "Webエンジニア",
            "岡田　茂之",
            "okada shigeyuki",
            "",
            "info_os-create@os-create.com",
            "",
            "○●--------------------------------●○",
        ].join("\n"),
    }

    return message;
}

router.post("/send", async (req, res) => {
    const newEmail = new Email(req.body);
    const userMessage = userSendMail(req.body.email, req.body.name, req.body.content);
    const adminMessage = adminSendMail(req.body.email, req.body.name, req.body.content);
    try {
        const email = await newEmail.save();
        try {
            await sgMail.send(userMessage);
            await sgMail.send(adminMessage);
        } catch (error) {
            console.error('Error sending email:', error);
            if (error.response) {
                console.error(error.response.body)
            }
            return res.status(500).json({error: 'Failed to send email.'});
        }
        return res.status(200).json(email);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;