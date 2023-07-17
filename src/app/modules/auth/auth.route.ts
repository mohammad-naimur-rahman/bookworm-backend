import { validateRequest } from './../../middlewares/validateRequest'
import { Router } from 'express'
import { AuthValidation } from './auth.validation'
import { authController } from './auth.controller'

const router = Router()

router.post(
  '/login',
  validateRequest(AuthValidation.checkTokenForAuthSchema),
  authController.loginUser
)

router.post(
  '/signup',
  validateRequest(AuthValidation.checkTokenForAuthSchema),
  authController.signupUser
)

export const AuthRoutes = router
