const transporter = require("../../util/transporter");

const sendActivationMail = (user) => {
  transporter.sendMail(
    {
      from: "SocialMediaAPP",
      to: user.email,
      subject: "Activate your account",
      html: `${user.name} your account has been successfully created,
       click on the following link to activate your account:<br><br> 
        <a href="http://localhost:5000/authentication/activation/${user.id}">
        click here to activate your account
      </a>`,
    },
    (err) => {
      if (err) console.log(`Error: ${err}`);
    }
  );
};

module.exports = sendActivationMail;
