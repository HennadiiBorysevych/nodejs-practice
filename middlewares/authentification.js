const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { HTTPError } = require("../utils");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HTTPError(401));
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(HTTPError(401));
    }
    
    next();

  } catch {
    next(HTTPError(401));
  }
};
module.exports = authenticate;