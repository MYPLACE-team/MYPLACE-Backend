import { status } from '../../config/response.status.js'
import { response } from '../../config/response.js'
import { addPlace, cancelPreferencePlace } from '../models/place.dao.js'
import { showPreferencePlacesService } from '../services/place.service.js'

// 장소 등록
export const addPlaceController = async (req, res) => {
  const {
    lat,
    lon,
    name,
    address,
    category_id,
    recDish,
    closedDay,
    service,
    link,
    hashtag,
    images,
    uploader, //임시
  } = req.body

  try {
    const placeId = await addPlace(
      lat,
      lon,
      name,
      address,
      category_id,
      recDish,
      closedDay,
      service,
      link,
      hashtag,
      images,
      uploader, //임시
    )

    res.status(201).json(response(status.SUCCESS, { placeId }))
  } catch (error) {
    console.error('Error in addPlaceController:', error)
    res.send(response(status.BAD_REQUEST, null))
  }
}

export const showPreferencePlacesController = async (req, res) => {
  console.log('유저가 관심장소 조회를 요청하였습니다')
  try {
    const placeList = await showPreferencePlacesService(req.body)

    res.send(response(status.SHOW_PREFERENCE_PLACES_SUCCESS, placeList))
  } catch (err) {
    console.error('Error in showPreferencePlacesController:', err)
    res.send(response(status.BAD_REQUEST, null))
  }
}

export const cancelPreferencePlaceController = async (req, res) => {
  console.log('관심장소 취소')

  const { placeId } = req.params
  const userId = 1 // 임시 변수

  console.log('placeId', placeId)
  try {
    const result = await cancelPreferencePlace(userId, placeId)

    res.status(200).json(response(status.SUCCESS, { placeId }))
  } catch (err) {
    console.error('Error in deletePreferencePlaceController:', err)
    res.send(response(status.BAD_REQUEST, null))
  }
}
