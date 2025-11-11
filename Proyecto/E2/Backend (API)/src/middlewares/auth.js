const jwt = require('jsonwebtoken');
const { User } = require('../models');


const authenticateToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const bearerToken = header && header.startsWith('Bearer ')
      ? header.split(' ')[1]
      : null;
    const cookieToken = req.cookies && req.cookies.token;
    const token = cookieToken || bearerToken;

    if (!token) {
      return res.status(401).json({
        error: 'Acceso denegado. Token no proporcionado.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId || decoded.sub;
    if (!userId) {
      return res.status(401).json({ error: 'Token sin identificador de usuario.' });
    }

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado.' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado.' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido.' });
    }
    return res.status(500).json({ error: 'Error en la autenticación.' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.username !== 'admin') {
    return res.status(403).json({
      error: 'Acceso denegado. Se requieren permisos de administrador.'
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  isAdmin
};
