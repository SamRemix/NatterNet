import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const create = async ({ body }: Request, res: Response) => {
  try {
    const post = await prisma.post.create({
      data: { ...body }
    })

    res.status(200).json(post)
  } catch (error) {
    console.log(error)
  }
}

export const findAll = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany()

    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
  }
}

export const findOne = async ({ params }: Request, res: Response) => {
  try {
    const posts = await prisma.post.findUnique({
      where: {
        id: params.id
      }
    })

    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
  }
}

export const udpate = async ({ params, body }: Request, res: Response) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: params.id
      },
      data: { ...body }
    })

    res.status(200).json(post)
  } catch (error) {
    console.log(error)
  }
}

export const remove = async ({ params }: Request, res: Response) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id: params.id
      }
    })

    res.status(200).json(post)
  } catch (error) {
    console.log(error)
  }
}