import { Prisma } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const { message, code, meta } = err

  // prisma db connection error
  if (err instanceof Prisma.PrismaClientInitializationError) {
    return res.status(400).json({ message: 'Error creating a database connection' })
  }

  // prisma error
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (code === 'P2023') {
      return res.status(400).json({ code, message: 'Inconsistent column data' })
    }

    return res.status(400).json({ code, message: meta?.cause || 'This error is unhandled' })

    /**
     * > npx prisma db push
     * EPERM: operation not permitted
     * npm uninstall @prisma/client
     * npm i @prisma/client
     */
  }

  // express error
  return res.status(400).json({ message })
}

export default errorHandler