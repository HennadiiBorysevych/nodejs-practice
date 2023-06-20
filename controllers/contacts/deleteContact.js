const { Contact } = require("../../models/contact");

const {  HTTPError } = require("../../utils");

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const data = await Contact.findByIdAndRemove(contactId);
    if (!data) {
      throw HTTPError(404, "Not Found");
    }
    res.status(200).json({ message: "contact deleted" });
  };
module.exports = deleteContact;
  