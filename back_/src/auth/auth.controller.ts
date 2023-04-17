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
    // checks if fields are empty
    const { emptyFieldsError } = checkEmptyFields({ name, email, password })

    if (emptyFieldsError.message) {
      return res.status(400).json({ ...emptyFieldsError })
    }

    // checks the length of the name
    const { nameLengthError } = isValidNameLength(name, 3, 32)

    if (nameLengthError) {
      throw new Error(nameLengthError)
    }

    // checks if the email already matches a user in the database
    const exists = await findUserByEmail(email)

    if (exists) {
      throw new Error('This email is already in use')
    }

    // checks if the email is valid
    if (!isEmail(email)) {
      throw new Error('Your email is invalid')
    }

    // checks if the password is strong enough
    const { passwordError } = isStrongPassword(password)

    if (passwordError.message) {
      return res.status(400).json({ ...passwordError })
    }

    // encrypt the password
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
    // checks if fields are empty
    const { emptyFieldsError } = checkEmptyFields({ email, password })

    if (emptyFieldsError.message) {
      return res.status(400).json({ ...emptyFieldsError })
    }

    // checks if the email matches a user in the database
    const user = await findUserByEmail(email)

    if (!user) {
      throw new Error('This email does not exist')
    }

    // compares the password with that of the user who matches the email
    const match = await compare(password, user.password)

    if (!match) {
      throw new Error('This password is incorrect')
    }

    const token = createToken(user.id)

    res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}