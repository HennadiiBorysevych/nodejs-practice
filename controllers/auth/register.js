const { HTTPError, transport } = require("../../utils");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HTTPError(409, "Email is registed");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    from: "hennadiiborysevych@meta.ua",
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to virify email </a>`,
  };
  await transport.sendMail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;
