/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import config from '../../config'
import ApiError from '../../errorHandlers/ApiError'
import handleCastError from '../../errorHandlers/handleCastError'
import handleValidationError from '../../errorHandlers/handleValidationError'
import handleZodError from '../../errorHandlers/handleZodError'
import { GenericErrMsgType } from '../../types/errMsg.type'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === 'development'
    ? console.error(`$🌋 globalErrorHandler ~ ${err}`)
    : console.log(`$🌋 globalErrorHandler ~ ${err}`)

  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessages: Array<GenericErrMsgType> = []

  if (err?.name === 'ValidationError') {
    statusCode = 400
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message ? [{ path: '', message }] : []
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
    errorMessages = err.message ? [{ path: '', message }] : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
