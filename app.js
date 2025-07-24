const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = 3000;
const { verifyToken } = require('./middlewares/authMiddleware');
require('dotenv').config();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // gunakan true jika pakai https
  })
);

app.use('/api/auth', authRoutes);
app.get('/api/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
