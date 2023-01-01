const transporter = require("../../util/transporter");

const sendActivationMail = (id, name, email, req) => {
  transporter.sendMail(
    {
      from: "Social Media APP",
      to: email,
      subject: "Activate your account",
      html: `${name} your account has been successfully created,
       click on the following link to activate your account:<br><br> 
        <a href="${req.protocol}://${req.get('host')}/activation/${id}">
        click here to activate your account
      </a>`,
    },
    (err) => {
      if (err) console.log(`Error: ${err}`);
    }
  );
};

module.exports = sendActivationMail;
