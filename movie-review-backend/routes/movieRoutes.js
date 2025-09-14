const express = require('express');
const {
  getMovies,
  getMovieById,
  createMovie,
  addReview,
  getMovieReviews,
} = require('../controllers/movieController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', protect, createMovie);
router.get('/:id/reviews', protect, getMovieReviews);
router.post('/:id/reviews', protect, addReview);

module.exports = router;