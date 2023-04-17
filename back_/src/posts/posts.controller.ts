import prisma from '../prisma'
import { Request, Response, NextFunction } from 'express'
import checkEmptyFields from '../utils/checkEmptyFields'

const { post } = prisma

export const create = async ({ body }: Request, res: Response, next: NextFunction) => {
  const { title } = body

  try {
    // checks if title is empty
    const { emptyFieldsError } = checkEmptyFields({ title })

    if (emptyFieldsError.message) {
      return res.status(400).json({ ...emptyFieldsError })
    }

    const data = await post.create({
      data: {
        ...body,
        userId: res.locals.user
      }
    })

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await post.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const findOne = async ({ params }: Request, res: Response, next: NextFunction) => {
  try {
    const data = await post.findUnique({
      where: {
        id: params.id
      }
    })

    if (!data) {
      throw new Error('Cannot find this post')
    }

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const udpate = async ({ params, body }: Request, res: Response, next: NextFunction) => {
  try {
    const data = await post.update({
      where: {
        id: params.id
      },
      data: {
        ...body
      }
    })

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const remove = async ({ params }: Request, res: Response, next: NextFunction) => {
  try {
    const data = await post.delete({
      where: {
        id: params.id
      }
    })

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}