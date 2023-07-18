'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.BookValidation = void 0
const zod_1 = require('zod')
const book_constants_1 = require('./book.constants')
const createBookSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: 'Title is required',
    }),
    author: zod_1.z.string({
      required_error: 'Author is required',
    }),
    genre: zod_1.z.enum([...book_constants_1.bookGenres], {
      required_error: 'Genres is required',
    }),
    image: zod_1.z.string().optional(),
    publicationDate: zod_1.z.string({
      required_error: 'Publication Date is required',
    }),
    user: zod_1.z.string({
      required_error: 'User is required!',
    }),
  }),
})
const updateBookSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().optional(),
    author: zod_1.z.string().optional(),
    genre: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    publicationDate: zod_1.z.string().optional(),
    user: zod_1.z.string({ required_error: 'User is required' }),
  }),
})
const createReviewSchema = zod_1.z.object({
  body: zod_1.z.object({
    review: zod_1.z.string({
      required_error: 'Review text is required',
    }),
    user: zod_1.z.string().optional(),
  }),
})
exports.BookValidation = {
  createBookSchema,
  updateBookSchema,
  createReviewSchema,
}
