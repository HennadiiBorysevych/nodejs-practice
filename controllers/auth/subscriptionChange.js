const { User } = require("../../models/user");
const { HTTPError } = require("../../utils");

const subscriptionChange = async (req, res) => {
  const { _id } = req.user;
  const validSubscription = ["starter", "pro", "business"].includes(
    req.body.subscription
  );
  if (!validSubscription) {
    throw HTTPError(400, "Wrong subscription");
  }
  await User.findByIdAndUpdate(_id, { subscription: req.body.subscription });

  res.status(200).json({
    message: "Subscription is changed",
  });
};

module.exports = subscriptionChange;
