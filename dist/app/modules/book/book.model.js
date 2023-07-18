'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Book = exports.BookSchema = void 0
const mongoose_1 = require('mongoose')
const book_constants_1 = require('./book.constants')
exports.BookSchema = new mongoose_1.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: book_constants_1.bookGenres,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviews: [
      {
        review: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose_1.Schema.Types.ObjectId,
          ref: 'User',
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)
exports.Book = (0, mongoose_1.model)('Book', exports.BookSchema)
