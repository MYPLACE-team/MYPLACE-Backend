import express from 'express'
import { authLogin, authJWT, authGoogleRedirectTest } from '../controllers/auth.controller'
import {
  imageUploader,
  profileUpload,
  middleMultipleUpload,
} from '../middlewares/aws.middleware'

export const authRouter = express.Router({ mergeParams: true })

authRouter.get('/', authGoogleRedirectTest)//임시
authRouter.post('/login', authLogin)
authRouter.get('/login', authJWT) //임시

//사진 1개
authRouter.post(
  '/upload/:directory',
  imageUploader.single('image'),
  profileUpload,
)

//사진 3개
authRouter.post(
  '/uploads/:directory/:archiveId',
  imageUploader.array('image', 3),
  middleMultipleUpload,
)
