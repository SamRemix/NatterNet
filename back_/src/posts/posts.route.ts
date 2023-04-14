import { Router } from 'express'

import { create, findAll, findOne, udpate, remove } from './posts.controller'

export const router = Router()

router.post('/', create)

router.get('/', findAll)

router.get('/:id', findOne)

router.put('/:id', udpate)

router.delete('/:id', remove)