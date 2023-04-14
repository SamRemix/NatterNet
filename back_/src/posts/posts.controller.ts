import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

// Post model
const { post } = new PrismaClient()

export const create = async ({ body }: Request, res: Response) => {
  try {
    const data = await post.create({
      data: {
        ...body
      }
    })

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

export const findAll = async (_req: Request, res: Response) => {
  try {
    const data = await post.findMany({
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
    const data = await post.findUnique({
      where: {
        id: params.id
      }
    })

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

export const udpate = async ({ params, body }: Request, res: Response) => {
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
    console.log(error)
  }
}

export const remove = async ({ params }: Request, res: Response) => {
  try {
    const data = await post.delete({
      where: {
        id: params.id
      }
    })

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}