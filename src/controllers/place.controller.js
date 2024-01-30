import { status } from '../../config/response.status.js'
import { response } from '../../config/response.js'
import { addPlace } from '../models/place.dao.js'
import {
  showPreferencePlacesService,
  searchPlaceService,
  toggleVisitedService
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
  const user_id = 1 // 임시
  const category = req.body.category
  const sort = req.body.sort
  const visit = req.body.visit

  const data = {
    user_id,
    category,
    sort,
    visit
  }

  try {
    const placeList = await showPreferencePlacesService(data)

    res.send(response(status.SHOW_PREFERENCE_PLACES_SUCCESS, placeList))
  } catch (err) {
    console.error('Error in showPreferencePlacesController:', err)
    res.send(response(status.BAD_REQUEST, null))
    // res.status(err.status || 500).json(response(err.code, null));
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

// 가본 장소, 안가본 장소 변경
export const toggleVisitedController = async (req, res) => {
  console.log('가본 장소/안가본 장소 변경')
  console.log(req.place_id);
  const user_id = 1 // 임시
  const place_id = req.body.place_id

  const data = {
    user_id,
    place_id
  }

  try{
    const result = await toggleVisitedService(data);
    console.log(result);
    res.send(response(status.PLACE_VISITED_TOGGLE_SUCCESS, "Success"));

  } catch (err){
    console.error(err);
    res.send(response(status.BAD_REQUEST, null));
  }
}
