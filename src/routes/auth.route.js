import express from 'express'
import {
  authLogin,
  authGoogleRedirectTest,
} from '../controllers/auth.controller'

export const authRouter = express.Router({ mergeParams: true })

authRouter.get('/', authGoogleRedirectTest)
authRouter.post('/login', authLogin)
