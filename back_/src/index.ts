import 'dotenv/config'
const { PORT } = process.env

import express from 'express'

import { router } from './posts/posts.route'

const app = express()

app.use(express.json())

app.use('/post', router)

app.listen(PORT, () => {
  console.log('App is running')
})