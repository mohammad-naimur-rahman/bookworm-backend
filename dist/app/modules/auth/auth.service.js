'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.authService = void 0
const firebase_admin_1 = __importDefault(require('firebase-admin'))
const http_status_1 = __importDefault(require('http-status'))
const ApiError_1 = __importDefault(require('../../../errorHandlers/ApiError'))
const auth_model_1 = require('./auth.model')
const loginUser = (authorization, email) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const token =
      authorization === null || authorization === void 0
        ? void 0
        : authorization.split(' ')[1]
    if (!token) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Token missing!'
      )
    }
    const decodeValue = yield firebase_admin_1.default
      .auth()
      .verifyIdToken(token)
    if (decodeValue.email !== email) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Invalid token!'
      )
    }
    const user = yield auth_model_1.User.findOne({ email })
    if (!user) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'No user found with this email!'
      )
    }
    return user
  })
const signupUser = (authorization, body) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email } = body
    const token =
      authorization === null || authorization === void 0
        ? void 0
        : authorization.split(' ')[1]
    if (!token) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Token missing!'
      )
    }
    const decodeValue = yield firebase_admin_1.default
      .auth()
      .verifyIdToken(token)
    if (decodeValue.email !== email) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Invalid token!'
      )
    }
    const createdUser = yield auth_model_1.User.create(body)
    if (!createdUser) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to create user!'
      )
    }
    return createdUser
  })
exports.authService = {
  loginUser,
  signupUser,
}
