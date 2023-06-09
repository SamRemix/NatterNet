import { Router } from 'express'
import { signUp, logIn } from './auth.controller'

export const router = Router()

router
  .post('/sign-up', signUp)
  .post('/log-in', logIn)