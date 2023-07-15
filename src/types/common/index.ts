import { GenericErrMsgType } from '../errMsg.type'

export type GenericErrResType = {
  statusCode: number
  message: string
  errorMessages: Array<GenericErrMsgType>
  stack?: string
}

export type GlobalErrType = {
  statusCode: number
  message: string
}
