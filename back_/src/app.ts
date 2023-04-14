import express from 'express'

import { router as authRouter } from './auth/auth.route'
import { router as userRouter } from './posts/posts.route'

const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/post', userRouter)

export default app