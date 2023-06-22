const validateBody = require("./validateBody");
const isValidId = require("./isValid");
const authenticate = require('./authentification')

module.exports = {
  validateBody,
  isValidId,
  authenticate
};
