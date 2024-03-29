const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "sandeepachamath72@gmail.com",
    pass: "bjgp xsdz xpji gaqv",
  },
});

exports.send = (req, res, next) => {
  console.log("<===== Send Email ====>");
  const { text } = req.body;

  const mailOptions = {
    from: "sandeepachamath72@gmail.com",
    to: "kiddogrow91@gmail.com",
    subject: "Contact Me",
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ message: "Email is not send" });
    } else {
      console.log("Email sent successfully");
      return res.status(200).send({ message: "Email sent successfully" });
    }
  });
};
