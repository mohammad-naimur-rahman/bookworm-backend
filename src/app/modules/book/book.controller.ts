import { Request, RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import { pick } from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { searchAndFilterableFields } from './book.constants'
import { BookService } from './book.service'
import { IBook } from './book.interface'

const getAllBooks: RequestHandler = asyncHandler(async (req, res) => {
  const paginationOptions = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ])

  const filters = pick(req.query, searchAndFilterableFields)

  const books = await BookService.getAllBooksFromDB(filters, paginationOptions)
  sendResponse<Array<IBook>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved all books successfully',
    meta: books?.meta,
    data: books?.data,
  })
})

const createBook: RequestHandler = asyncHandler(async (req, res) => {
  const createdBook = await BookService.createBookInDB(req.body)
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book created successfully',
    data: createdBook,
  })
})

const getBook: RequestHandler = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req
  const book = await BookService.getBookFromDB(id)
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved book successfully',
    data: book,
  })
})

export type AuthenticatedRequest = Request & {
  email: string
}

const updateBook: RequestHandler = asyncHandler(async (req, res) => {
  const {
    body,
    params: { id },
    email,
  } = req as AuthenticatedRequest
  const updatedBook = await BookService.updateBookInDB(id, body, email)
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book updated successfully',
    data: updatedBook,
  })
})

const deleteBook: RequestHandler = asyncHandler(async (req, res) => {
  const {
    params: { id },
    email,
  } = req as AuthenticatedRequest
  await BookService.deleteBookFromDB(id, email)
  sendResponse<string>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book deleted successfully',
    data: id,
  })
})

export const BookController = {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
}
