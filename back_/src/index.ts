import 'dotenv/config'

import express from 'express'

import { router as userRouter } from './posts/posts.route'

const app = express()

app.use(express.json())

app.use('/post', userRouter)

app.listen(process.env.PORT, () => {
  console.log('App is running')
})