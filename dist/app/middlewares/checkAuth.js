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
/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require('http-status'))
const ApiError_1 = __importDefault(require('../../errorHandlers/ApiError'))
const firebase_config_1 = __importDefault(
  require('../../config/firebase-config')
)
const checkAuth = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const {
      headers: { authorization },
    } = req
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
    try {
      const decodeValue = yield firebase_config_1.default
        .auth()
        .verifyIdToken(token)
      if (decodeValue) {
        req.email = decodeValue.firebase.identities.email[0]
        next()
      }
    } catch (e) {
      next()
    }
  })
exports.default = checkAuth
