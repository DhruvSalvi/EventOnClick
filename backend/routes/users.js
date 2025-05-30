const express = require('express');
const {
  getMe,
  updateDetails,
  updatePassword,
  getUsers,
  approveCreator
} = require('../controllers/userController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/me', protect, getMe);
router.put('/me', protect, updateDetails);
router.put('/password', protect, updatePassword);

// Admin routes
router.get('/', protect, authorize('admin'), getUsers);
router.put('/:id/approve', protect, authorize('admin'), approveCreator);

module.exports = router;
