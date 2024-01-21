import express from 'express'
import { addPlaceController } from '../controllers/place.controller'

export const placeRouter = express.Router({ mergeParams: true })

placeRouter.post('/', addPlaceController)
