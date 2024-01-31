import { status } from '../../config/response.status.js'
import { response } from '../../config/response.js'
import { addPlace, addPreferencePlace } from '../models/place.dao.js'
import {
  showPreferencePlacesService,
  searchPlaceService,
} from '../services/place.service.js'

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
    res.status(error.status || 500).json(response(error.code, null))
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
    // res.status(err.status || 500).json(response(err.code, null));
  }
}

// 관심장소 추가
export const addPreferencePlaceController = async (req, res) => {
  const { placeId } = req.params
  const userId = 1 // 임시 변수

  try {
    const result = await addPreferencePlace(userId, placeId)
    res.status(201).json(response(status.SUCCESS, { placeId }))
  } catch (err) {
    console.error('Error in addPreferencePlaceController:', err)
    res.send(response(status.BAD_REQUEST, null))
    // res.status(err.status || 500).json(response(err.code, null))
  }
}

// 장소 검색
export const searchPlaceController = async (req, res) => {
  console.log('장소 검색')
  const user_id = 1 //임시
  const keyword = req.query.keyword
  const page = req.query.page

  const data = {
    user_id,
    keyword,
    page,
  }

  try {
    const placeList = await searchPlaceService(data)

    const totalNum = placeList.length
    const hasNext = totalNum > 10 * page ? true : false
    const currentPages = placeList.slice(10 * (page - 1), 10 * page)

    const result = {
      totalNum,
      hasNext,
      place: currentPages,
    }
    res.status(200).json(response(status.SUCCESS, result))
  } catch (err) {
    console.error('Error in searchPlaceController:', err)
    res.send(response(status.BAD_REQUEST, null))
  }
}
