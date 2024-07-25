import nodemailer from "nodemailer";

export const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: `Task-Management || By Rajan`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    return info;
  } catch (err) {
    console.error("Error in mailSender", err);
  }
};


