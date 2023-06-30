const { User } = require("../../models/user");
const { HTTPError, transport } = require("../../utils");

const resendVerifacation = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HTTPError(401, "Not Found");
  }
  if (user.verify) {
    throw HTTPError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    from: "hennadiiborysevych@meta.ua",
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Click to virify email </a>`,
  };
  await transport.sendMail(verifyEmail);

  res.status(200).json({
    message: "Verification successful",
  });
};
module.exports = resendVerifacation;
