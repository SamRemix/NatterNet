import prisma from '../prisma'
import { Request, Response, NextFunction } from 'express'
import { hash, compare } from 'bcrypt'
import checkEmptyFields from '../utils/checkEmptyFields'
import findUserByEmail from '../utils/findUserByEmail'
import createToken from '../utils/createToken'
import isEmail from '../utils/isEmail'
import isStrongPassword from '../utils/isStrongPassword'
import isValidNameLength from '../utils/isValidNameLength'

export const signUp = async ({ body }: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = body

  try {
    const { emptyFieldsError } = checkEmptyFields({ name, email, password })

    if (emptyFieldsError.message) {
      return res.status(400).json({ ...emptyFieldsError })
    }

    const { nameLengthError } = isValidNameLength(name, 3, 32)

    if (nameLengthError) {
      throw new Error(nameLengthError)
    }

    const exists = await findUserByEmail(email)

    if (exists) {
      throw new Error('This email is already in use')
    }

    if (!isEmail(email)) {
      throw new Error('Your email is invalid')
    }

    const { passwordError } = isStrongPassword(password)

    if (passwordError.message) {
      return res.status(400).json({ ...passwordError })
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword
      }
    })

    const token = createToken(user.id)

    res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}

export const logIn = async ({ body }: Request, res: Response, next: NextFunction) => {
  const { email, password } = body

  try {
    const { emptyFieldsError } = checkEmptyFields({ email, password })

    if (emptyFieldsError.message) {
      return res.status(400).json({ ...emptyFieldsError })
    }

    const user = await findUserByEmail(email)

    if (!user) {
      throw new Error('This email does not exist')
    }

    const match = await compare(password, user.password)

    if (!match) {
      throw new Error('Your password is incorrect')
    }

    const token = createToken(user.id)

    res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}