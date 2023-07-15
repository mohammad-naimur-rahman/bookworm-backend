import { Schema, model } from 'mongoose'
import { BookModel, IBook } from './book.interface'

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
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    publicationDate: {
      type: Date,
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

export const Book = model<IBook, BookModel>('Student', BookSchema)
