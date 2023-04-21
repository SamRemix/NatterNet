import express from 'express'
import cors from 'cors'

import { router as authRouter } from './auth/auth.route'
import { router as userRouter } from './users/users.route'
import { router as albumRouter } from './albums/albums.route'

import errorHandler from './middlewares/errorHandler'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/albums', albumRouter)

app.use(errorHandler)

export default app