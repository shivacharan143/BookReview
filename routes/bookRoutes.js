const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const pagination = require('../middlewares/pagination');
const { addBook, getAllBooks, getBookById, searchBooks } = require('../controllers/bookController');

// @route   POST /books
// @desc    Add a new book
// @access  Private
router.post('/', auth, addBook);

// @route   GET /books
// @desc    Get all books with pagination and filters
// @access  Public
router.get('/', pagination(), getAllBooks);

// @route   GET /books/:id
// @desc    Get book details by ID
// @access  Public

router.get('/:id', pagination(5), getBookById);

// @route   GET /search
// @desc    Search books by title or author
// @access  Public
router.get('/search', pagination(), searchBooks);

module.exports = router;