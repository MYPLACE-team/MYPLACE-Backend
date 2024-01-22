import express from 'express'
import { authLogin } from '../controllers/auth.controller'

export const authRouter = express.Router({ mergeParams: true })

authRouter.post('/login', authLogin)
