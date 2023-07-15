import { Model } from 'mongoose'

export type BookType = {
  _id?: string
  password: string
  role: 'seller' | 'buyer'
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string
  address: string
  budget: number
  income: number
  createdAt: Date
  updatedAt: Date
}

export type BookModel = Model<BookType, Record<string, unknown>>
