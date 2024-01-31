import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import { showPreferencePlacesDTO } from '../dtos/place.dto'
import { getPreferencePlacesList, getSearchPlace } from '../models/place.dao'

export const showPreferencePlacesService = async (req) => {
  try {
    const placeList = await getPreferencePlacesList(
      req.userId, // 임시 변수, userId 가져올 방법 있으면 변경 예정
      req.category,
      req.sort,
      req.visit,
    )
  } catch (err) {
    console.error(err)
  }

  console.log(placeList)

  return showPreferencePlacesDTO(placeList)
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
