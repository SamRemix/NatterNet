import express from 'express'

import { router as userRouter } from './posts/posts.route'

const app = express()

app.use(express.json())

app.use('/post', userRouter)

export default app