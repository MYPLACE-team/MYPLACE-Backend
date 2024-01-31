import express from 'express'
import {
  addPlaceController,
  addPreferencePlaceController,
  searchPlaceController,
  showPreferencePlacesController,
} from '../controllers/place.controller'

export const placeRouter = express.Router({ mergeParams: true })

placeRouter.post('/', addPlaceController)
placeRouter.post('/like', showPreferencePlacesController)
placeRouter.post('/like/:placeId', addPreferencePlaceController)
placeRouter.get('/search', searchPlaceController)
