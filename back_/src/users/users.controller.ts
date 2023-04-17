import prisma from '../prisma'
import { Request, Response, NextFunction } from 'express'
import checkEmptyFields from '../utils/checkEmptyFields'
import findUserByEmail from '../utils/findUserByEmail'
import { compare, hash } from 'bcrypt'
import isStrongPassword from '../utils/isStrongPassword'
import isEmail from '../utils/isEmail'
import isValidNameLength from '../utils/isValidNameLength'

const { user } = prisma

export const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await user.findMany({
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
    const data = await user.findUnique({
      where: {
        id: params.id
      },
      include: {
        posts: true
      }
    })

    if (!data) {
      throw new Error('Cannot find this user')
    }

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const udpate = async ({ params, body }: Request, res: Response, next: NextFunction) => {
  const { name, email, password, newPassword } = body

  try {
    const currentUser = await user.findUnique({
      where: {
        id: params.id
      }
    })

    if (!currentUser) {
      throw new Error('User not found')
    }

    const { isEmptyField } = checkEmptyFields({ name, email, password, newPassword })

    if (!isEmptyField('name')) {
      const { nameLengthError } = isValidNameLength(name, 3, 32)

      if (nameLengthError) {
        throw new Error(nameLengthError)
      }
    }

    if (!isEmptyField('email')) {
      if (email === currentUser.email) {
        throw new Error('This email is already yours')
      }

      const exists = await findUserByEmail(email)

      if (exists) {
        throw new Error('This email is already in use')
      }

      if (!isEmail(email)) {
        throw new Error('Your email is invalid')
      }
    }

    let hashedPassword

    if (isEmptyField('password') && !isEmptyField('newPassword')) {
      throw new Error('Your current password is required')
    }

    if (!isEmptyField('password' && 'newPassword')) {
      const match = await compare(password, currentUser.password)

      if (!match) {
        throw new Error('Incorrect password')
      }

      if (password === newPassword) {
        throw new Error('The passwords are the same')
      }

      const { passwordError } = isStrongPassword(newPassword)

      if (passwordError.message) {
        return res.status(400).json({ ...passwordError })
      }

      hashedPassword = await hash(newPassword, 10)
    }

    const data = await user.update({
      where: {
        id: params.id
      },
      data: {
        name: name || currentUser.name,
        email: email || currentUser.email,
        password: hashedPassword || currentUser.password
      }
    })

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const remove = async ({ params }: Request, res: Response, next: NextFunction) => {
  try {
    const data = await user.delete({
      where: {
        id: params.id
      }
    })

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}