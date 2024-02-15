import { status } from '../../config/response.status.js'
import { response } from '../../config/response.js'
import {
  cancelPreferencePlace,
  addPreferencePlace,
} from '../models/place.dao.js'
import {
  showPreferencePlacesService,
  searchPlaceService,
  showPlaceDetailService,
  addPlaceService,
  toggleVisitedService,
  showInitialInfoPlaceService,
} from '../services/place.service.js'
import { showPlaceListDTO } from '../dtos/place.dto.js'

// 장소 등록
export const addPlaceController = async (req, res) => {
  try {
    const placeId = await addPlaceService(req.body)

    res.status(201).json(response(status.SUCCESS, { placeId }))
  } catch (error) {
    console.error('Error in addPlaceController:', error)
    res.send(response(status.BAD_REQUEST, null))
  }
}

export const showInitialInfoPlaceController = async (req, res) => {
  console.log('유저가 홈 초기 정보 조회를 요청하였습니다')
  const user_id = 1

  try {
    const info = await showInitialInfoPlaceService(user_id)

    res.send(response(status.SHOW_INITIAL_INFO_SUCCESS, info))
  } catch (err) {
    console.error('Error in showInitialInfoPlaceController', err)
    res.send(response(status.BAD_REQUEST, null))
  }
}

export const showPreferencePlacesController = async (req, res) => {
  console.log('유저가 관심장소 조회를 요청하였습니다')
  const user_id = 1 // 임시
  const category = req.body.category
  const sort = req.body.sort
  const visit = req.body.visit

  const data = {
    user_id,
    category,
    sort,
    visit,
  }

  try {
    const placeList = await showPreferencePlacesService(data)

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
      place: showPlaceListDTO(currentPages),
    }
    res.status(200).json(response(status.SUCCESS, result))
  } catch (err) {
    console.error('Error in searchPlaceController:', err)
    res.send(response(status.BAD_REQUEST, null))
  }
}

// 마플 장소 상세
export const showPlaceDetailController = async (req, res) => {
  console.log('마플 장소 상세')
  const { placeId } = req.params
  const userId = 1 //임시

  try {
    const placeDetail = await showPlaceDetailService(placeId, userId)

    res.status(200).json(response(status.SUCCESS, placeDetail))
  } catch (err) {
    console.error('Error in showPlaceDetailController:', err)
    res.send(response(status.BAD_REQUEST, null))
  }
}

// 가본 장소, 안가본 장소 변경
export const toggleVisitedController = async (req, res) => {
  console.log('가본 장소/안가본 장소 변경')
  const user_id = 1 // 임시
  const {placeId}  = req.params
  const data = {
    user_id,
    placeId,
  }

  const result = await toggleVisitedService(data)

  if (result === 1) {
    res.send(response(status.PLACE_VISITED_TOGGLE_SUCCESS, 'Success'))
  }

  res.send(response(status.BAD_REQUEST, null))
}
