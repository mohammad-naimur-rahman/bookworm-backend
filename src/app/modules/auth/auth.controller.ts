import asyncHandler from 'express-async-handler'
import sendResponse from '../../../shared/sendResponse'
import { RequestHandler } from 'express'
import { authService } from './auth.service'
import httpStatus from 'http-status'

const loginUser: RequestHandler = asyncHandler(async (req, res) => {
  const {
    headers: { authorization },
    body: { email },
  } = req

  const user = await authService.loginUser(authorization, email)

  sendResponse<{ email: string }>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Signin successfull!',
    data: user,
  })
})

const signupUser: RequestHandler = asyncHandler(async (req, res) => {
  const {
    headers: { authorization },
    body,
  } = req

  const user = await authService.signupUser(authorization, body)

  sendResponse<{ email: string }>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Signin successfull!',
    data: user,
  })
})

export const authController = {
  loginUser,
  signupUser,
}
