const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { adminLogin } = require('../controllers/adminAuthController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/login', adminLogin);
router.get('/me', protect, getMe);

module.exports = router;
