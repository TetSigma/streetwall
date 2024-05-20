const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function (req, res, next) {
  const cookies = req.cookies;

  if (!cookies || !cookies.jwtToken) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = cookies.jwtToken;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
