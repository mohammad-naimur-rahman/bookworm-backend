import mongoose from 'mongoose'
import { GenericErrResType } from '../types/common'
import { GenericErrMsgType } from '../types/errMsg.type'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): GenericErrResType => {
  const errors: Array<GenericErrMsgType> = Object.values(err.errors).map(el => {
    return {
      path: el?.path,
      message: el?.message,
    }
  })

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
