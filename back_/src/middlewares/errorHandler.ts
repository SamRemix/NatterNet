import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const { name, message, code, meta } = err

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({ code, message: meta?.cause })
  }

  return res.status(400).json({ name, message })
}

export default errorHandler