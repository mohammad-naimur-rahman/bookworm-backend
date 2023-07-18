'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.isNonEmptyObj = void 0
const isNonEmptyObj = obj => {
  if (Object.keys(obj).length) return true
  return false
}
exports.isNonEmptyObj = isNonEmptyObj
