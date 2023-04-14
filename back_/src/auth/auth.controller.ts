import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { hash } from 'bcrypt'

const { user } = new PrismaClient()

export const signUp = async ({ body }: Request, res: Response) => {
  const { name, email, password } = body

  let emptyFields: string[] = []

  Object.entries(body).map(([key, value]) => {
    if (!value) {
      emptyFields.push(key)
    }
  })

  if (emptyFields.length > 0) {
    return res.status(400).json({ message: 'You must fill all the fields', emptyFields })
  }

  const alreadyExists = await user.findUnique({
    where: {
      email
    }
  })

  if (alreadyExists) {
    return res.status(400).json({ message: 'This email is already in use' })
  }

  if (name.trim().length < 3) {
    return res.status(400).json({ message: 'Your name must contain at least 3 characters' })
  }

  if (name.trim().length > 32) {
    return res.status(400).json({ message: 'Your name must not exceed 32 characters' })
  }

  const isEmail = email.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

  if (!isEmail) {
    return res.status(400).json({ message: 'Your email is invalid' })
  }

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

  const hashedPassword = await hash(password, 10)

  try {
    const data = await user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}