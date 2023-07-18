'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.User = exports.UserSchema = void 0
const mongoose_1 = require('mongoose')
exports.UserSchema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)
exports.User = (0, mongoose_1.model)('User', exports.UserSchema)
