const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateWatchlist,
  getWatchlist
} = require('../controllers/userController');

// Import the protect middleware correctly
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', protect, getUserProfile);
router.get('/watchlist', getWatchlist);
router.post('/watchlist', updateWatchlist);

module.exports = router;