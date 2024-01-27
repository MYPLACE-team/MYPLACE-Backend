import { pool } from '../../config/db.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'

import {
  insertPlace,
  selectHashtag,
  insertHashtag,
  insertPlaceHashtag,
  insertPlaceImage,
  insertPlaceThumbnail,
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
  uploader,
) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.beginTransaction()

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
      uploader, //임시
    ])

    const placeId = result.insertId

    // 썸네일 이미지 추가
    await conn.query(insertPlaceThumbnail, [placeId, images[0]])

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
