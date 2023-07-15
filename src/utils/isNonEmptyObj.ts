export const isNonEmptyObj = (obj: object): boolean => {
  if (Object.keys(obj).length) return true
  return false
}
