const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { addReview, updateReview, deleteReview } = require('../controllers/reviewController');

// @route   POST /books/:id/reviews
// @desc    Submit a review for a book
// @access  Private
router.post('/books/:id/reviews', auth, addReview);

// @route   PUT /reviews/:id
// @desc    Update a review
// @access  Private
router.put('/:id', auth, updateReview);

// @route   DELETE /reviews/:id
// @desc    Delete a review
// @access  Private
router.delete('/:id', auth, deleteReview);

module.exports = router;