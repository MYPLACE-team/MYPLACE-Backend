import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import { showPreferencePlacesDTO } from '../dtos/place.dto'
import {
  getPreferencePlacesList,
  getSearchPlace,
  getPlaceDetail,
  addPlace,
  toggleVisited,
  showInitialPlaceInfo,
} from '../models/place.dao'

export const showPreferencePlacesService = async (req) => {
  try {
    const placeList = await getPreferencePlacesList(
      req.user_id, // 임시 변수, userId 가져올 방법 있으면 변경 예정
      req.category,
      req.sort,
      req.visit,
    )

    return showPreferencePlacesDTO(placeList)
  } catch (err) {
    console.error(err)
  }
}

export const showInitialInfoPlaceService = async (user_id) => {
  try {
    const result = await showInitialPlaceInfo(user_id)

    return {
      "username": result.username,
      "placeList": showPreferencePlacesDTO(result.placeList)
    }
  } catch (err) {
    console.error(err)
  }
}

export const searchPlaceService = async (req) => {
  try {
    const placeList = await getSearchPlace(req)

    return placeList
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const showPlaceDetailService = async (placeId, userId) => {
  try {
    const placeDetail = await getPlaceDetail(placeId, userId)

    return placeDetail
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const addPlaceService = async (req) => {
  try {
    const result = await addPlace(req)
    console.log(result)
    return result
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const toggleVisitedService = async (req) => {
  try {
    const result = await toggleVisited(req)

    return result
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}
