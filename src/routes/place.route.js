import express from 'express'
import {
  addPlaceController,
  showPreferencePlacesController,
  toggleVisitedController,
  cancelPreferencePlaceController,
  addPreferencePlaceController,
  searchPlaceController,
  showPlaceDetailController,
} from '../controllers/place.controller'

export const placeRouter = express.Router({ mergeParams: true })

placeRouter.post('/', addPlaceController)
placeRouter.get('/search', searchPlaceController)
placeRouter.post('/like', showPreferencePlacesController)
placeRouter.delete('/like/:placeId', cancelPreferencePlaceController)
placeRouter.post('/like/:placeId', addPreferencePlaceController)
placeRouter.post('/visit', toggleVisitedController)

placeRouter.get('/:placeId', showPlaceDetailController)
