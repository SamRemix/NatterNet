import { Router } from 'express'
import { create, findAll, findOne, udpate, remove } from './posts.controller'
import requireAuth from '../middlewares/requireAuth'

export const router = Router()

router.use(requireAuth)

router.post('/', create)

router.get('/', findAll)

router.get('/:id', findOne)

router.put('/:id', udpate)

router.delete('/:id', remove)