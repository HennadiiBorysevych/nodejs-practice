const current = async (req, res) => {
    const { email, token, subscription } = req.user;
  
    res.status(200).json({
      email,
      token,
      subscription,
    });
  };
  module.exports = current;