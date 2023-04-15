import prisma from '../prisma'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

const requireAuth = async (req: Request | any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token required' })
  }

  // remove 'Bearer ' from the token string
  const token = authorization.split(' ')[1]

  try {
    const id = verify(token, process.env.SECRET as string)

    const user = await prisma.user.findUnique({
      where: {
        id: id as string
      },
      select: {
        id: true
      }
    })

    if (user) {
      req.userId = id
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Request isn\'t authorized' })
  }
}

export default requireAuth