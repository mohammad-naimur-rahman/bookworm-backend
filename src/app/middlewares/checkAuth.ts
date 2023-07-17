/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import ApiError from '../../errorHandlers/ApiError'
import { NextFunction, Request, Response } from 'express'
import admin from '../../config/firebase-config'

const checkAuth = async <T>(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<T | void> => {
  const {
    headers: { authorization },
  } = req

  const token = authorization?.split(' ')[1]

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token missing!')
  }

  try {
    const decodeValue = await admin.auth().verifyIdToken(token)
    if (decodeValue) {
      ;(req as any).email = decodeValue.firebase.identities.email[0]
      next()
    }
  } catch (e) {
    next()
  }
}

export default checkAuth
