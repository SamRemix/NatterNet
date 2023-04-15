import { Router } from 'express'
import { create, findAll, findOne, udpate, remove } from './posts.controller'
import auth from '../middlewares/auth'

export const router = Router()

router
  // require authentication
  .use(auth)
  .post('/', create)
  .get('/', findAll)
  .get('/:id', findOne)
  .put('/:id', udpate)
  .delete('/:id', remove)