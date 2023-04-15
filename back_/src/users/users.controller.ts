import prisma from '../prisma'
import { Request, Response } from 'express'

const { user } = prisma

export const findAll = async (_req: Request, res: Response) => {
  try {
    const data = await user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

export const findOne = async ({ params }: Request, res: Response) => {
  try {
    const data = await user.findUnique({
      where: {
        id: params.id
      },
      include: {
        posts: true
      }
    })

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

export const udpate = async ({ params, body }: Request, res: Response) => {
  try {
    const data = await user.update({
      where: {
        id: params.id
      },
      data: {
        ...body
      }
    })

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

export const remove = async ({ params }: Request, res: Response) => {
  try {
    const data = await user.delete({
      where: {
        id: params.id
      }
    })

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}