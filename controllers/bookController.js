const Book = require('../models/Book');
const Review = require('../models/Review');

const addBook = async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;

  try {
    const book = new Book({
      title,
      author,
      genre,
      publishedYear,
      createdBy: req.user._id,
    });

    await book.save();

    res.status(201).json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getAllBooks = async (req, res) => {
  const { author, genre } = req.query;
  const { skip, limit } = req.pagination;

  try {
    const query = {};
    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = new RegExp(genre, 'i');

    const books = await Book.find(query)
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'username');

    const total = await Book.countDocuments(query);

    res.json({
      data: books,
      pagination: {
        page: req.pagination.page,
        limit: req.pagination.limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('createdBy', 'username');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Get average rating
    const reviewsAggregate = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, averageRating: { $avg: '$rating' } } },
    ]);

    const averageRating = reviewsAggregate.length > 0 
      ? Math.round(reviewsAggregate[0].averageRating * 10) / 10 
      : null;

    // Get paginated reviews
    const { skip, limit } = req.pagination;
    const reviews = await Review.find({ book: book._id })
      .skip(skip)
      .limit(limit)
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    const totalReviews = await Review.countDocuments({ book: book._id });

    res.json({
      ...book.toObject(),
      averageRating,
      reviews: {
        data: reviews,
        pagination: {
          page: req.pagination.page,
          limit: req.pagination.limit,
          total: totalReviews,
          pages: Math.ceil(totalReviews / limit),
        },
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const searchBooks = async (req, res) => {
  const { q } = req.query;
  const { skip, limit } = req.pagination;

  if (!q) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const query = {
      $or: [
        { title: new RegExp(q, 'i') },
        { author: new RegExp(q, 'i') },
      ],
    };

    const books = await Book.find(query)
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'username');

    const total = await Book.countDocuments(query);

    res.json({
      data: books,
      pagination: {
        page: req.pagination.page,
        limit: req.pagination.limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { addBook, getAllBooks, getBookById, searchBooks };