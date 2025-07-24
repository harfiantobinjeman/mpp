const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

// admin only
router.post('/register/moderator', verifyToken, authController.registerModerator);

//profil
router.get('/profile', authController.profile);

module.exports = router;
