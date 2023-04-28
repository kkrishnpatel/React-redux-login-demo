const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  console.log('user verified')
  const token =
    req.body.token || req.query.token || req.params.token || req.headers["auth"];
  if (!token) {
    return res.status(403).send({ message: "A token is required for authentication" });
  }
  try {
    const { name, email } = jwt.verify(token, config.TOKEN_KEY);
    req.user = { name, email };
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;

