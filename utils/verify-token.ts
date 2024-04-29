
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SEC , (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid!");
          return;
        } else {
          req.user  = user;
          next();
        }
      });
    } catch (err) {
      res.status(500).json("Internal Server Error");
    }
  } else {
    res.status(401).json("You are not authenticated!");
    return;
  }
};


module.exports = {verifyToken};