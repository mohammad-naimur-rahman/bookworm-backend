import { Response } from 'express'
import httpStatus from 'http-status'

type ApiResponseType<T> = {
  statusCode?: number | undefined
  success?: boolean | undefined
  message?: string | null
  meta?: {
    page: number
    limit: number
    total: number
  }
  data?: T | null
}

const sendResponse = <T>(res: Response, data: ApiResponseType<T>): void => {
  const responseData: ApiResponseType<T> = {
    success: data?.success || true,
    statusCode: data?.statusCode || undefined,
    message: data?.message || 'Document created successfully!',
    meta: data?.meta,
    data: data?.data || null,
  }
  res.status(data?.statusCode || httpStatus.OK).json(responseData)
}

export default sendResponse
