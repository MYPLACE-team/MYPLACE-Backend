import { status } from '../../config/response.status.js'
import { response } from '../../config/response.js'
import { addPlace } from '../models/place.dao.js'

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
