'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.AuthRoutes = void 0
const validateRequest_1 = require('./../../middlewares/validateRequest')
const express_1 = require('express')
const auth_validation_1 = require('./auth.validation')
const auth_controller_1 = require('./auth.controller')
const router = (0, express_1.Router)()
router.post(
  '/login',
  (0, validateRequest_1.validateRequest)(
    auth_validation_1.AuthValidation.checkTokenForAuthSchema
  ),
  auth_controller_1.authController.loginUser
)
router.post(
  '/signup',
  (0, validateRequest_1.validateRequest)(
    auth_validation_1.AuthValidation.checkTokenForAuthSchema
  ),
  auth_controller_1.authController.signupUser
)
exports.AuthRoutes = router
