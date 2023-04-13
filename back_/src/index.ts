import 'dotenv/config'
const { PORT } = process.env

import express from 'express'

const app = express()

app.listen(PORT, () => {
  console.log('App is running')
})