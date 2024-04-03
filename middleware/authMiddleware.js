const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.header.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
    const decodeData = jwt.verify(token, secret);
    req.user = decodeData
    next()
  } catch (error) {
    console.log(error);
    return res.status(404).json('Пользователь не авторизован');
  }
};
