import express from 'express'
import {
  addPlaceController,
  searchPlaceController,
  showPreferencePlacesController,
} from '../controllers/place.controller'

export const placeRouter = express.Router({ mergeParams: true })

placeRouter.post('/', addPlaceController)
placeRouter.post('/like', showPreferencePlacesController)
placeRouter.get('/search', searchPlaceController)
