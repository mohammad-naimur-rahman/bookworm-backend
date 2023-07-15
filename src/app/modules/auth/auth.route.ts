import { validateRequest } from './../../middlewares/validateRequest'
import asyncHandler from 'express-async-handler'
import { Router } from 'express'
import admin from '../../../config/firebase-config'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { AuthValidation } from './auth.validation'
import ApiError from '../../../errorHandlers/ApiError'

const router = Router()

router.post(
  '/login',
  validateRequest(AuthValidation.checkTokenForLoginSchema),
  asyncHandler(async (req, res) => {
    const {
      headers: { authorization },
      body: { email },
    } = req

    const token = authorization?.split(' ')[1]

    if (!token) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Token missing!')
    }

    try {
      const decodeValue = await admin.auth().verifyIdToken(token)
      if (decodeValue.email === email) {
        sendResponse<{ email: string }>(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: 'Logged in successfully!',
          data: { email },
        })
      }
    } catch (e) {
      sendResponse<null>(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Login failed!',
        data: null,
      })
    }
  })
)

export const AuthRoutes = router
