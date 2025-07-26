const controller = require('../controllers/auth.controller');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

module.exports = (app) => {
  const router = require('express').Router();

  router.post('/register', controller.register); // untuk user
  router.post('/login', controller.login);
  router.post('/refresh', controller.refresh);
  router.post('/logout', controller.logout);

  // Khusus admin
  router.post('/register/moderator', verifyToken, requireRole("admin"), async (req, res) => {
    const { name, email, password } = req.body;
    const hash = await require('bcryptjs').hash(password, 10);
    const user = await require('../models').User.create({ name, email, password: hash, role: 'moderator' });
    res.status(201).json({ message: 'Moderator registered' });
  });

  app.use('/api/auth', router);
};
