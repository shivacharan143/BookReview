# Project Structure

BookReview
├── config/
│   ├── db.js
│   └── jwt.js
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── reviewController.js
├── middlewares/
│   ├── auth.js
│   └── pagination.js
├── models/
│   ├── Book.js
│   ├── Review.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── reviewRoutes.js
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
# Database Schema (MongoDB)
User:

username (String, required, unique)

email (String, required, unique)

password (String, required)

createdAt (Date, default: Date.now)

Book:

title (String, required)

author (String, required)

genre (String, required)

publishedYear (Number)

createdBy (ObjectId, ref: User)

createdAt (Date, default: Date.now)

Review:

book (ObjectId, ref: Book, required)

user (ObjectId, ref: User, required)

rating (Number, required, min: 1, max: 5)

comment (String)

createdAt (Date, default: Date.now)

updatedAt (Date)

# Dependencies
npm install express mongoose jsonwebtoken bcryptjs dotenv cors express-validator

#

# Book Review API

A RESTful API for managing books and reviews with user authentication.

## Features

- User authentication (JWT)
- Add, view books
- Add, update, delete reviews
- Pagination and filtering
- Search functionality

## Technologies

- Node.js
- Express.js
- MongoDB
- JWT for authentication

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. install nodemon and run npm run dev
4. Create a `.env` file based on `.env.example`
5. Start the server: `npm run dev`

## API Endpoints

### Authentication

- `POST /signup/signup` - Register a new user
- `POST /login/login` - Authenticate user and get token

### Books

- `POST /books` - Add a new book (Authenticated)
- `GET /books` - Get all books (with pagination and filters)
- `GET /books/:id` - Get book details by ID
- `GET /search` - Search books by title or author

### Reviews

- `POST /books/:id/reviews` - Submit a review (Authenticated)
- `PUT /reviews/:id` - Update your review (Authenticated)
- `DELETE /reviews/:id` - Delete your review (Authenticated)

### .env file
MONGODB_URI="mongodb+srv://vsc143341:Shiva@cluster0.5hjbpvg.mongodb.net/bookreview?"
JWT_SECRET="Anykey"
PORT=5000
