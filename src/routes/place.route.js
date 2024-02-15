import express from 'express'
import {
  addPlaceController,
  showPreferencePlacesController,
  toggleVisitedController,
  cancelPreferencePlaceController,
  addPreferencePlaceController,
  searchPlaceController,
  showPlaceDetailController,
  showInitialInfoPlaceController,

} from '../controllers/place.controller'

export const placeRouter = express.Router({ mergeParams: true })

placeRouter.post('/', addPlaceController)
placeRouter.get('/', showInitialInfoPlaceController)
placeRouter.get('/search', searchPlaceController)
placeRouter.post('/like', showPreferencePlacesController)
placeRouter.delete('/like/:placeId', cancelPreferencePlaceController)
placeRouter.post('/like/:placeId', addPreferencePlaceController)
placeRouter.get('/visit/:placeId', toggleVisitedController)

placeRouter.get('/:placeId', showPlaceDetailController)
