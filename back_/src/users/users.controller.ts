import prisma from '../prisma'
import { Request, Response } from 'express'
import checkEmptyFields from '../utils/checkEmptyFields'
import findUserByEmail from '../utils/findUserByEmail'
import { compare, hash } from 'bcrypt'
import isStrongPassword from '../utils/isStrongPassword'
import isEmail from '../utils/isEmail'
import isValidNameLength from '../utils/isValidNameLength'

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
  const { name, email, password, newPassword } = body

  try {
    const currentUser = await user.findUnique({
      where: {
        id: params.id
      }
    })

    if (!currentUser) {
      return res.status(400).json({ message: 'No such user' })
    }

    const { isEmptyField } = checkEmptyFields({ name, email, password, newPassword })

    if (!isEmptyField('name')) {
      // checks the length of the name
      const { nameLengthError } = isValidNameLength(name, 3, 32)

      if (nameLengthError) {
        return res.status(400).json({ message: nameLengthError })
      }
    }

    if (!isEmptyField('email')) {
      if (email === currentUser.email) {
        return res.status(400).json({ message: 'This email is already yours' })
      }

      // checks if the email already matches a user in the database
      const exists = await findUserByEmail(email)

      if (exists) {
        return res.status(400).json({ message: 'This email is already in use' })
      }

      // checks if the email is valid
      if (!isEmail(email)) {
        return res.status(400).json({ message: 'Your email is invalid' })
      }
    }

    let hashedPassword

    if (isEmptyField('password') && !isEmptyField('newPassword')) {
      return res.status(400).json({ message: 'Your current password is required' })
    }

    if (!isEmptyField('password' && 'newPassword')) {
      // compares request password with current user password
      const match = await compare(password, currentUser.password)

      if (!match) {
        return res.status(400).json({ message: 'Incorrect password' })
      }

      if (password === newPassword) {
        return res.status(400).json({ message: 'The passwords are the same' })
      }

      // checks if the password is strong enough
      const { passwordError } = isStrongPassword(newPassword)

      if (passwordError.message) {
        return res.status(400).json({ ...passwordError })
      }

      // encrypt the password
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