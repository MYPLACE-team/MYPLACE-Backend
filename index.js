import express from 'express'

import { authRouter } from './src/routes/auth.route'

const app = express()
const port = 3000
app.use(express.json())

app.use('/auth', authRouter)

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
