const { Contact } = require("../../models/contact");

const { HTTPError } = require("../../utils");

const getById = async (req, res) => {
    const { contactId } = req.params;
    const data = await Contact.findById(contactId);
    if (!data) {
      throw HTTPError(404, "Not found");
    }
    res.json(data);
  };
module.exports = getById;
