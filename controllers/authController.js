const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middlewares/authMiddleware');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password, role: 'user' });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.registerModerator = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can register moderator' });
    }

    const user = await User.create({ name, email, password, role: 'moderator' });
    res.status(201).json({ message: 'Moderator registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.profile =(req, res) => {
    if (!req.session.user) return res.status(401).json({ message: 'Unauthorized' });
    res.json({ user: req.session.user });
};