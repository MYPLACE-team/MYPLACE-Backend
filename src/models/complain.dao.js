import { pool } from '../../config/db.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'

import { insertPlaceComplain } from './complain.sql'
import { selectPlace } from './place.sql'

export const postComplainPlace = async (req, res) => {
  const conn = await pool.getConnection()

  const { placeId } = req.params
  const { content } = req.body
  const userId = 1 //임시로 1로 설정

  // 해당 placeId가 존재하는지 확인
  const place = await conn.query(selectPlace, placeId)
  if (place[0].length === 0) {
    console.log('장소가 존재하지 않음')
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }

  try {
    const result = await conn.query(insertPlaceComplain, [
      userId,
      placeId,
      content,
    ])
    conn.release()
    return { placeId: parseInt(placeId) }
  } catch (error) {
    console.log(error)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}
