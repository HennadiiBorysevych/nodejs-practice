const {  TryCatchWrapper } = require("../../utils");

const getAll = require("./getAll");
const getById = require("./getById");
const deleteContact = require("./deleteContact");
const changeContact = require("./changeContact");
const addContact = require("./addContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getAll: TryCatchWrapper(getAll),
  getById: TryCatchWrapper(getById),
  deleteContact: TryCatchWrapper(deleteContact),
  changeContact: TryCatchWrapper(changeContact),
  addContact: TryCatchWrapper(addContact),
  updateStatusContact: TryCatchWrapper(updateStatusContact),
};
