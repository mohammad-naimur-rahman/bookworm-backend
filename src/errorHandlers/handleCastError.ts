import mongoose from 'mongoose'
import { GenericErrMsgType } from '../types/errMsg.type'

const handleCastError = (err: mongoose.Error.CastError) => {
  const message = 'Invalid Id'

  const errorMessage: GenericErrMsgType = {
    path: err.path,
    message,
  }

  return {
    statusCode: 500,
    message,
    errorMessages: [errorMessage],
  }
}

export default handleCastError
