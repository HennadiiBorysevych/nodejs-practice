const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  // Зробити фільтрацію контактів по полю обраного (GET /contacts?favorite=true)
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const sorted = { owner };
  if (favorite !== undefined) {
    sorted.favorite = favorite;
  }
  const data = await Contact.find(sorted, "", {
    skip,
    limit,
  }).populate("owner", "email");

  res.json(data);
};
module.exports = getAll;
