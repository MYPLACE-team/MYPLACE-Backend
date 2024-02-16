import express from 'express'
import { userGetInfoController } from '../controllers/user.controller'

export const userRouter = express.Router({ mergeParams: true })

userRouter.get('/:userId', userGetInfoController)
//userRouter.post('/:userId', userEditProfileController)
