const jwt = require('jsonwebtoken');
const { env } = require('../../config');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authorization token missing or invalid',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwt.secret);


    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      isActive: decoded.isActive,
    };


    if (!req.user.isActive) {
      return res.status(403).json({
        message: 'User account is deactivated',
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
};

module.exports = authMiddleware;
