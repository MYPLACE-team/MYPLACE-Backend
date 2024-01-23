import express from 'express'
import {
  addPlaceController,
  showPreferencePlacesController,
  addPreferencePlaceController,
} from '../controllers/place.controller'

export const placeRouter = express.Router({ mergeParams: true })

placeRouter.post('/', addPlaceController)
placeRouter.post('/like', showPreferencePlacesController)
placeRouter.post('/like/:placeId', addPreferencePlaceController)
