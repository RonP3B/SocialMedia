const transporter = require("../../util/transporter");

const sendResetPassMail = (user, newPassword) => {
  transporter.sendMail(
    {
      from: "SocialMediaAPP",
      to: user.email,
      subject: "New password",
      html: `${user.name}, since you have forgotten your password,
       we generated a new one for you.<br> <br> 
       <strong>Here is your new password:</strong> ${newPassword}`,
    },
    (err) => {
      if (err) console.log(`Error: ${err}`);
    }
  );
};

module.exports = sendResetPassMail;
