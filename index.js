import express from 'express'
import cors from 'cors'
import { response } from './config/response'
import { status } from './config/response.status'
import { BaseError } from './config/error'
import { authRouter } from './src/routes/auth.route'
import { placeRouter } from './src/routes/place.route'
import { archiveRouter } from './src/routes/archive.route'
import { userRouter } from './src/routes/user.route'

const app = express()
const port = 3000
app.use(express.json())
app.use(cors())
app.use('/auth', authRouter)
app.use('/place', placeRouter)
app.use('/archive', archiveRouter)
app.use('/user', userRouter)

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use((req, res, next) => {
  const err = new BaseError(status.NOT_FOUND)
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}
  console.log('Error 발생: ', err)
  res
    .status(err.data.status || status.INTERNAL_SERVER_ERROR)
    .send(response(err.data))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
