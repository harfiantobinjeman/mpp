const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // ganti dengan secret env jika produksi

// Middleware auth - cek token
exports.verifyToken = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = bearer.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // simpan ke req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware role
exports.requireRole = (role) => {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: 'Forbidden: role required ' + role });
    }
    next();
  };
};

// Token generator
exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    secretKey,
    { expiresIn: '1d' }
  );
};
