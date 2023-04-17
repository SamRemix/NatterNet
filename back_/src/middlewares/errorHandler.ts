import { Prisma } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const { message, code, meta } = err

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({ code, message: meta?.cause })
  }

  return res.status(400).json({ message })
}

export default errorHandler