import express from 'express'
import { authLogin, authJWT } from '../controllers/auth.controller'
import { imageUploader } from '../middlewares/aws.middleware'

export const authRouter = express.Router({ mergeParams: true })

authRouter.post('/login', authLogin)
authRouter.get('/login', authJWT) //임시
authRouter.post('/upload', imageUploader.single('image'), (req, res) => {
  try {
    res.send('success!')
  } catch (err) {
    res.send(err)
  }
}) //임시
