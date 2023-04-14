import { Router } from 'express'

import { signUp } from './auth.controller'

export const router = Router()

router.post('/sign-up', signUp)