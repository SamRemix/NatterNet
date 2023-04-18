import { Router } from 'express'
import { create, findAll, findOne, udpate, remove } from './posts.controller'
import auth from '../middlewares/auth'

export const router = Router()

router
  .post('/', auth, create) // require auth
  .get('/', findAll)
  .get('/:id', findOne)
  .put('/:id', auth, udpate) // require auth
  .delete('/:id', auth, remove) // require auth