const transporter = require("../../util/transporter");

const sendConfirmCode = (user, code) => {
  transporter.sendMail(
    {
      from: "SocialMedia",
      to: user.email,
      subject: "Confirm code",
      html: `Confirm code: <strong>${code}<strong>`,
    },
    (err) => {
      if (err) console.log(`Error: ${err}`);
    }
  );
};

module.exports = sendConfirmCode;
