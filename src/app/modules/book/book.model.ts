import { Schema, model } from 'mongoose'
import { BookModel, IBook } from './book.interface'
import { bookGenres } from './book.constants'

export const BookSchema = new Schema<IBook, BookModel>(
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
      enum: bookGenres,
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Book = model<IBook, BookModel>('Book', BookSchema)
