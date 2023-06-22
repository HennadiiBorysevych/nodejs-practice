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
    throw HTTPError(401, "Email or password is wrong");
  }

  const passwordСomparison = await bcrypt.compare(password, user.password);

  if (!passwordСomparison) {
    throw HTTPError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "23h",
  });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
  });
};

const current = async (req, res) => {
  const { email } = req.user;
     
  res.status(200).json({
    email,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Log out success",
  });
};

module.exports = {
  register: TryCatchWrapper(register),
  login: TryCatchWrapper(login),
  current: TryCatchWrapper(current),
  logout: TryCatchWrapper(logout),
};
