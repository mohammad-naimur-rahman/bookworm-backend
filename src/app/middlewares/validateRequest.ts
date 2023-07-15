import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { AnyZodObject, ZodEffects } from 'zod'

export const validateRequest = (
  schema: AnyZodObject | ZodEffects<AnyZodObject>
) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
      headers: req.headers,
      cookies: req.cookies,
    })
    next()
  })
