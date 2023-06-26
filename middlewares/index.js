const validateBody = require("./validateBody");
const isValidId = require("./isValid");
const authenticate = require('./authentification')
const upload = require('./upload')

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload
};
