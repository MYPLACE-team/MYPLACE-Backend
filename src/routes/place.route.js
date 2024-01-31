import express from 'express'
import {
  addPlaceController,
  showPreferencePlacesController,
  cancelPreferencePlaceController,
  addPreferencePlaceController,
  searchPlaceController,
} from '../controllers/place.controller'

export const placeRouter = express.Router({ mergeParams: true })

placeRouter.post('/', addPlaceController)
placeRouter.post('/like', showPreferencePlacesController)
placeRouter.delete('/like/:placeId', cancelPreferencePlaceController)
placeRouter.post('/like/:placeId', addPreferencePlaceController)
placeRouter.get('/search', searchPlaceController)
