import { Model, Types } from 'mongoose'

export type Review = {
  review: string
  user?: Types.ObjectId
}

export type IBook = {
  title: string
  author: string
  genre: 'fiction' | 'mystery' | 'science_fiction' | 'fantasy' | 'triller'
  image?: string
  publicationDate: string
  reviews?: Array<Review>
  user: Types.ObjectId
}

export type BookModel = Model<IBook, Record<string, unknown>>
