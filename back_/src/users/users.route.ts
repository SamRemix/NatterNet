import { Router } from 'express'
import { findAll, findOne, udpate, remove } from './users.controller'

export const router = Router()

router
  .get('/', findAll)
  .get('/:id', findOne)
  .put('/:id', udpate)
  .delete('/:id', remove)