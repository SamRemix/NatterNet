import express from 'express'

import { router as authRouter } from './auth/auth.route'
import { router as userRouter } from './users/users.route'
import { router as postRouter } from './posts/posts.route'

import logRequest from './middlewares/logRequest'
import errorHandler from './middlewares/errorHandler'

const app = express()

app.use(express.json())

app.use(logRequest)

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)

app.use(errorHandler)

export default app