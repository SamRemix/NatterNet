import { Router } from 'express'
import { create, findAll, findOne, udpate, remove } from './posts.controller'
import requireAuth from '../middlewares/requireAuth'

export const router = Router()

router
  // require authentication to access endpoints
  .use(requireAuth)
  .post('/', create)
  .get('/', findAll)
  .get('/:id', findOne)
  .put('/:id', udpate)
  .delete('/:id', remove)