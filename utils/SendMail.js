// Import required modules
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env file

// Define the helper function to send emails
const SendMail = async (subject, email, data) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Set up mail options
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      // Subject of Email
      subject: subject,
      // This would be the text of email body
      html: data,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);
    return true; // Email sent successfully
  } catch (error) {
    console.error(error);
    return false; // Failed to send email
  }
};

module.exports = SendMail;
