const { User } = require("../../models/user");

const logout = async (req, res) => {
    const { _id } = req.user;
  
    await User.findByIdAndUpdate(_id, { token: "" });
  
    res.status(204).json({
      message: "Log out success",
    });
  };

  module.exports = logout;