import { Router } from 'express'
import { BookRoutes } from '../modules/book/book.route'
import { AuthRoutes } from '../modules/auth/auth.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
]

moduleRoutes.forEach(({ path, route }) => router.use(path, route))

export default router
