
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export async function sendReferralEmail(referrerEmail, refereeEmail, message) {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: refereeEmail,
//     subject: 'You have been referred!',
//     text: `Hi,You have been referred by ${referrerEmail}.

//  ${message}

// Best regards,
// Referral Team`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// }
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export function sendReferralEmail(referrerEmail, refereeEmail, message) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: refereeEmail,
      subject: 'You have been referred!',
      text: `Hi,

You have been referred by ${referrerEmail}.
${message}

Best regards,
Referral Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent: ', info.messageId);
        resolve(info.messageId);
      }
    });
  });
}
