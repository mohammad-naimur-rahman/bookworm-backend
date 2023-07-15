import { Router } from 'express'
import { BookRoutes } from '../modules/book/book.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/books',
    route: BookRoutes,
  },
]

moduleRoutes.forEach(({ path, route }) => router.use(path, route))

export default router
