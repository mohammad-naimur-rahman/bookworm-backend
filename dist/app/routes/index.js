'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = require('express')
const book_route_1 = require('../modules/book/book.route')
const auth_route_1 = require('../modules/auth/auth.route')
const router = (0, express_1.Router)()
const moduleRoutes = [
  {
    path: '/books',
    route: book_route_1.BookRoutes,
  },
  {
    path: '/auth',
    route: auth_route_1.AuthRoutes,
  },
]
moduleRoutes.forEach(({ path, route }) => router.use(path, route))
exports.default = router
