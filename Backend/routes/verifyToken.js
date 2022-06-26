const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).send("please login again");

  try {
    const verify = jwt.verify(token,"DIPLOMA_SECRET_KEY");
    req.owner = verify;
    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }
};