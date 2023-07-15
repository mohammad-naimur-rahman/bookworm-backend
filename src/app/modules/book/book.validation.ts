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
  }),
})

const updateBookSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    image: z.string().optional(),
    publicationDate: z.string().optional(),
  }),
})

export const BookValidation = {
  createBookSchema,
  updateBookSchema,
}
