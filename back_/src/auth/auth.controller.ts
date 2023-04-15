import prisma from '../prisma'
import { Request, Response } from 'express'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import checkEmptyFields from '../utils/checkEmptyFields'
import findUserByEmail from '../utils/findUserByEmail'
import createToken from '../utils/createToken'

export const signUp = async ({ body }: Request, res: Response) => {
  const { name, email, password } = body

  // checks if fields are empty
  const { emptyFields, message } = checkEmptyFields(body)

  if (emptyFields.length > 0) {
    return res.status(400).json({ message, emptyFields })
  }

  // checks if the email already matches a user in the database
  const exists = await findUserByEmail(email)

  if (exists) {
    return res.status(400).json({ message: 'This email is already in use' })
  }

  // checks the length of the name
  if (name.trim().length < 3) {
    return res.status(400).json({ message: 'Your name must contain at least 3 characters' })
  }

  if (name.trim().length > 32) {
    return res.status(400).json({ message: 'Your name must not exceed 32 characters' })
  }

  // checks if the email is valid
  const isEmail = email.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

  if (!isEmail) {
    return res.status(400).json({ message: 'Your email is invalid' })
  }

  // checks if the password is strong enough
  let invalidRegExps: string[] = []

  const regexps = [{
    regExp: /^.{8,}/,
    type: 'length'
  }, {
    regExp: /[A-Z]/,
    type: 'uppercase'
  }, {
    regExp: /[a-z]/,
    type: 'lowercase'
  }, {
    regExp: /\d/,
    type: 'number'
  }, {
    regExp: /[^a-zA-Z\d]/,
    type: 'special char'
  }]

  regexps.map(({ regExp, type }) => {
    if (!password.match(regExp)) {
      invalidRegExps.push(type)
    }
  })

  if (invalidRegExps.length > 0) {
    return res.status(400).json({ message: 'Your password isn\'t strong enough', invalidRegExps })
  }

  // encrypt the password
  const hashedPassword = await hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword
      }
    })

    const token = createToken(user.id)

    res.status(200).json({ user, token })
  } catch (error) {
    console.log(error)
  }
}

export const logIn = async ({ body }: Request, res: Response) => {
  const { email, password } = body

  // checks if fields are empty
  const { emptyFields, message } = checkEmptyFields(body)

  if (emptyFields.length > 0) {
    return res.status(400).json({ message, emptyFields })
  }

  // checks if the email matches a user in the database
  const user = await findUserByEmail(email)

  if (!user) {
    return res.status(400).json({ message: 'This email does not exist' })
  }

  // compares the password with that of the user who matches the email
  const match = await compare(password, user.password)

  if (!match) {
    return res.status(400).json({ message: 'This password is incorrect' })
  }

  const token = createToken(user.id)

  res.status(200).json({ user, token })
}