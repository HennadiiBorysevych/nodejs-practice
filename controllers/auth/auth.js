const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { TryCatchWrapper, HTTPError } = require("../../utils");

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



const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HTTPError(401, "Email or password invalid");
  }

  const passwordСomparison = await bcrypt.compare(password, user.password);

  if (!passwordСomparison) {
    throw HTTPError(401, "Email or password invalid");
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "23h",
  });

  res.status(201).json({
    token,
  });
};

module.exports = {
  register: TryCatchWrapper(register),
  login: TryCatchWrapper(login),
};
