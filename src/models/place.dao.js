import { pool } from '../../config/db.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'

import {
  insertPlace,
  selectHashtag,
  insertHashtag,
  insertPlaceHashtag,
  insertPlaceImage,
  updatePlaceThumbnail,
} from './place.sql'

export const addPlace = async (
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
) => {
  let conn
  const userId = 1 // 임시
  try {
    conn = await pool.getConnection()
    await conn.beginTransaction()

    const hashtagIds = []
    for (const tag of hashtag) {
      const [rows] = await conn.query(selectHashtag, [tag])
      if (rows.length > 0) {
        hashtagIds.push(rows[0].id)
      } else {
        const [result] = await conn.query(insertHashtag, [tag])
        hashtagIds.push(result.insertId)
      }
    }

    const [result] = await conn.query(insertPlace, [
      lat,
      lon,
      name,
      address,
      category_id,
      recDish,
      closedDay,
      service,
      link,
      userId,
    ])

    const placeId = result.insertId

    // 썸네일 이미지 추가
    await conn.query(updatePlaceThumbnail, [images[0], placeId])

    // place_image 테이블에 데이터 추가
    for (const url of images) {
      await conn.query(insertPlaceImage, [placeId, url])
    }

    // place_hashtag 테이블에 데이터 추가
    for (const hashtagId of hashtagIds) {
      await conn.query(insertPlaceHashtag, [placeId, hashtagId])
    }
    await conn.commit()
    conn.release()

    return placeId
  } catch (err) {
    console.log('ADDPLACE', err)

    try {
      if (conn) {
        await conn.rollback()
      }
    } catch (rollbackError) {
      console.error('Error in rollback:', rollbackError)
    }

    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}
