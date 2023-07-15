import { ZodError } from 'zod'
import { GenericErrMsgType } from '../types/errMsg.type'

const handleZodError = (err: ZodError) => {
  const errors: Array<GenericErrMsgType> = err.issues.map(zodIssue => {
    return {
      path: zodIssue.path[zodIssue.path.length - 1],
      message: zodIssue.message,
    }
  })
  return {
    statusCode: 400,
    message: 'Zod Validation error',
    errorMessages: errors,
  }
}

export default handleZodError
