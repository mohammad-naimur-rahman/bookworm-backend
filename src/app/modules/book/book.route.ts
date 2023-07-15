import { Router } from 'express'
import { BookController } from './book.controller'
import checkAuth from '../../middlewares/checkAuth'
import { validateRequest } from '../../middlewares/validateRequest'
import { BookValidation } from './book.validation'

const router = Router()

router
  .route('/')
  .get(BookController.getAllBooks)
  .post(
    validateRequest(BookValidation.createBookSchema),
    checkAuth,
    BookController.createBook
  )

router
  .route('/:id')
  .get(BookController.getBook)
  .patch(BookController.updateBook)
  .delete(BookController.deleteBook)

export const BookRoutes = router
