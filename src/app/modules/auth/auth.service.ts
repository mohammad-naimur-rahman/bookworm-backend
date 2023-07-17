import admin from 'firebase-admin'
import httpStatus from 'http-status'
import ApiError from '../../../errorHandlers/ApiError'
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { IUser } from './auth.interface'
import { User } from './auth.model'

const loginUser = async (authorization, email): Promise<IUser | null> => {
  const token = authorization?.split(' ')[1]

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token missing!')
  }

  const decodeValue: DecodedIdToken = await admin.auth().verifyIdToken(token)
  if (decodeValue.email !== email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token!')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No user found with this email!')
  }
  return user
}

const signupUser = async (
  authorization,
  body: IUser
): Promise<IUser | null> => {
  const { email } = body
  const token = authorization?.split(' ')[1]

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token missing!')
  }

  const decodeValue: DecodedIdToken = await admin.auth().verifyIdToken(token)

  if (decodeValue.email !== email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token!')
  }

  const createdUser = await User.create(body)

  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!')
  }
  return createdUser
}

export const authService = {
  loginUser,
  signupUser,
}
