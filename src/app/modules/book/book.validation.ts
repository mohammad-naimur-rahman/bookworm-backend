import { z } from 'zod'

const createBookSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genres is required',
    }),
    image: z.string().optional(),
    publicationDate: z.date({
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
    publicationDate: z.date().optional(),
  }),
})

export const BookValidation = {
  createBookSchema,
  updateBookSchema,
}
