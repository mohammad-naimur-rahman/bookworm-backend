import { Model } from 'mongoose'

export type IBook = {
  title: string
  author: string
  genre: 'fiction' | 'mystery' | 'science_fiction' | 'fantasy' | 'triller'
  image?: string
  publicationDate: Date
}

export type BookModel = Model<IBook, Record<string, unknown>>
