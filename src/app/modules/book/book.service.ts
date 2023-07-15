import { IBook } from './book.interface'
import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errorHandlers/ApiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import {
  FiltersType,
  PaginationOptionsType,
} from '../../../types/common/pagination'
import { GenericResponseType } from './../../../types/common/genericResponse'
import { filterableFields } from './book.constants'
import { Book } from './book.model'

const getAllBooksFromDB = async (
  filters: FiltersType,
  paginationOptions: PaginationOptionsType
): Promise<GenericResponseType<Array<IBook>> | null> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions: { [key: string]: unknown }[] = []

  if (searchTerm) {
    andConditions.push({
      $or: filterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Book.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const createBookInDB = async (payload: IBook): Promise<IBook | null> => {
  const createdBook = await Book.create(payload)
  if (!createdBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create book!')
  }
  return createdBook
}

const getBookFromDB = async (id: string): Promise<IBook | null> => {
  const book = await Book.findById(id)

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, `No book found with id ${id}`)
  }

  return book
}

const updateBookInDB = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const book = await Book.findById(id)

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, `No book found with id ${id}`)
  }

  const updatedBook = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  if (!updatedBook) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book update failed!')
  }

  return updatedBook
}

const deleteBookFromDB = async (id: string): Promise<IBook | null> => {
  const book = await Book.findById(id)

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, `No book found with id ${id}`)
  }
  const result = await Book.findByIdAndDelete(id)

  if (result === null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book delete failed!')
  }

  return result
}

export const BookService = {
  getAllBooksFromDB,
  createBookInDB,
  getBookFromDB,
  updateBookInDB,
  deleteBookFromDB,
}
