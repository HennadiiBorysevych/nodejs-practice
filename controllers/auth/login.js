const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
const { HTTPError } = require("../../utils");
const bcrypt = require("bcrypt");

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

module.exports = login;