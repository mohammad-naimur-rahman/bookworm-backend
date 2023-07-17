import { z } from 'zod'

const checkTokenForAuthSchema = z.object({
  headers: z.object({
    authorization: z.string({
      required_error: 'token is required',
    }),
  }),
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
  }),
})

export const AuthValidation = {
  checkTokenForAuthSchema,
}
