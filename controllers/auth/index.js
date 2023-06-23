const { TryCatchWrapper } = require("../../utils");

const logout = require("./logout");
const subscriptionChange = require("./subscriptionChange");
const current = require("./currentUser");
const login = require("./login");
const register = require("./register");

module.exports = {
  register: TryCatchWrapper(register),
  login: TryCatchWrapper(login),
  current: TryCatchWrapper(current),
  logout: TryCatchWrapper(logout),
  subscriptionChange: TryCatchWrapper(subscriptionChange),
};