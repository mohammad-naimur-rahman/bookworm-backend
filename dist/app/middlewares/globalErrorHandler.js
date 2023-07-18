'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const zod_1 = require('zod')
const config_1 = __importDefault(require('../../config'))
const ApiError_1 = __importDefault(require('../../errorHandlers/ApiError'))
const handleCastError_1 = __importDefault(
  require('../../errorHandlers/handleCastError')
)
const handleValidationError_1 = __importDefault(
  require('../../errorHandlers/handleValidationError')
)
const handleZodError_1 = __importDefault(
  require('../../errorHandlers/handleZodError')
)
const globalErrorHandler = (err, req, res, next) => {
  config_1.default.env === 'development'
    ? console.error(`$🌋 globalErrorHandler ~ ${err}`)
    : console.log(`$🌋 globalErrorHandler ~ ${err}`)
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessages = []
  if (
    (err === null || err === void 0 ? void 0 : err.name) === 'ValidationError'
  ) {
    statusCode = 400
    const simplifiedError = (0, handleValidationError_1.default)(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (
    (err === null || err === void 0 ? void 0 : err.name) === 'CastError'
  ) {
    const simplifiedError = (0, handleCastError_1.default)(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof zod_1.ZodError) {
    const simplifiedError = (0, handleZodError_1.default)(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof Error) {
    message = err === null || err === void 0 ? void 0 : err.message
    errorMessages = (err === null || err === void 0 ? void 0 : err.message)
      ? [{ path: '', message }]
      : []
  } else if (err instanceof ApiError_1.default) {
    statusCode = err.statusCode
    message = err.message
    errorMessages = err.message ? [{ path: '', message }] : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack:
      config_1.default.env !== 'production'
        ? err === null || err === void 0
          ? void 0
          : err.stack
        : undefined,
  })
  next()
}
exports.default = globalErrorHandler
