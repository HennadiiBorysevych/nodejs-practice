const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Contact.find({ owner }).populate(
    "owner",
    "email"
  );

  res.json(data);
};
module.exports = getAll;
