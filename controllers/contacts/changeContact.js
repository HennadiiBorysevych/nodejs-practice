const { Contact } = require("../../models/contact");

const {  HTTPError } = require("../../utils");

const changeContact = async (req, res) => {
    const { contactId } = req.params;
    const data = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!data) {
      throw HTTPError(404, "Not found");
    }
    res.json(data);
  };

module.exports = changeContact;
