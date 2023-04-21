import prisma from '../prisma'
import { Request, Response, NextFunction } from 'express'
import checkEmptyFields from '../utils/checkEmptyFields'

const { album } = prisma

export const create = async ({ body }: Request, res: Response, next: NextFunction) => {
  const { title, release, tracklist } = body

  try {
    const { emptyFieldsError } = checkEmptyFields({ title, track: tracklist.title })

    if (emptyFieldsError.message) {
      return res.status(400).json({ ...emptyFieldsError })
    }

    const data = await album.create({
      data: {
        title,
        release,
        tracklist: {
          createMany: {
            data: [
              ...tracklist
            ]
          }
        }
      }
    })

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await album.findMany({
      orderBy: {
        release: 'desc'
      },
      include: {
        tracklist: true
      }
    })

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const findOne = async ({ params }: Request, res: Response, next: NextFunction) => {
  try {
    const data = await album.findUnique({
      where: {
        id: params.id
      },
      include: {
        tracklist: true
      }
    })

    if (!data) {
      throw new Error('Cannot find this album')
    }

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const udpate = async ({ params, body }: Request, res: Response, next: NextFunction) => {
  try {
    const data = await album.update({
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
    const data = await album.delete({
      where: {
        id: params.id
      }
    })

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}