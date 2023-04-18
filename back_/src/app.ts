import express from 'express'
import cors from 'cors'

import { router as authRouter } from './auth/auth.route'
import { router as userRouter } from './users/users.route'
import { router as postRouter } from './posts/posts.route'

import errorHandler from './middlewares/errorHandler'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)

app.use(errorHandler)

export default app