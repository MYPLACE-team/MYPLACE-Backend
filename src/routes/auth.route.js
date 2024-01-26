import express from 'express'
import { authLogin, authJWT } from '../controllers/auth.controller'

export const authRouter = express.Router({ mergeParams: true })

authRouter.post('/login', authLogin)
authRouter.get('/login', authJWT) //임시
