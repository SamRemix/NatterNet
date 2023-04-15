import prisma from '../prisma'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

// assigns type 'Request | any' to req parameter to set userId
const auth = async (req: Request | any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token required' })
  }

  // remove the token prefix (Bearer)
  const token = authorization.split(' ')[1]

  try {
    const decoded = verify(token, process.env.SECRET as string)

    const user = await prisma.user.findUnique({
      where: {
        id: decoded as string
      },
      select: {
        id: true
      }
    })

    if (user) {
      req.userId = { ...user }
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Request isn\'t authorized' })
  }
}

export default auth