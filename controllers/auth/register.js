const { HTTPError } = require("../../utils");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HTTPError(409, "Email is registed");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;