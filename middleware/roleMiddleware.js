const { secret } = require('../config');
const jwt = require('jsonwebtoken')

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.header.authorization.split(' ')[1];
      if (!token) {
        return res.status(403).json({ message: 'Пользователь не авторизован' });
      }
      const { roles: userRoles } = jwt.wverify(token, secret);
      let hashRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hashRole = true;
        }
      });
      if(!hashRole){
        return res.status(403).json({message: 'У вас нет доступа'})
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(404).json('Пользователь не авторизован');
    }
  };
};
