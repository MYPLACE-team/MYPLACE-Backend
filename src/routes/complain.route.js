import express from 'express'
import {
  complainPlaceController,
  getComplainController,
} from '../controllers/complain.controller'

export const complainRouter = express.Router({ mergeParams: true })

complainRouter.post('/place/:placeId', complainPlaceController)
complainRouter.get('/', getComplainController)
