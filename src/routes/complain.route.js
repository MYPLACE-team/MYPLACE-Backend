import express from 'express'
import { complainPlaceController } from '../controllers/complain.controller'

export const complainRouter = express.Router({ mergeParams: true })

complainRouter.post('/place/:placeId', complainPlaceController)
