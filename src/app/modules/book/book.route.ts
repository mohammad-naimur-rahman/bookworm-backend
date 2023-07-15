import { Router } from 'express'
import { BookController } from './book.controller'

const router = Router()

router
  .route('/')
  .get(BookController.getAllBooks)
  .post(BookController.createBook)

router
  .route('/:id')
  .get(BookController.getBook)
  .patch(BookController.updateBook)
  .delete(BookController.deleteBook)

export const BookRoutes = router
