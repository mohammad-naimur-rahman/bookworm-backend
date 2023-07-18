import { z } from 'zod'
import { bookGenres } from './book.constants'

const createBookSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.enum([...bookGenres] as [string, ...string[]], {
      required_error: 'Genres is required',
    }),
    image: z.string().optional(),
    publicationDate: z.string({
      required_error: 'Publication Date is required',
    }),
    user: z.string({
      required_error: 'User is required!',
    }),
  }),
})

const updateBookSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    image: z.string().optional(),
    publicationDate: z.string().optional(),
    user: z.string({ required_error: 'User is required' }),
  }),
})

const createReviewSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: 'Review text is required',
    }),
    user: z.string().optional(),
  }),
})

export const BookValidation = {
  createBookSchema,
  updateBookSchema,
  createReviewSchema,
}
