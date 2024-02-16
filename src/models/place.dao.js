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
  selectAllPlace,
  deletePreferencePlace,
  selectPlace,
  insertPreferencePlace,
  selectSearchPlace,
  selectPlaceImage,
  selectPlaceHashtag,
  selectPlaceDetail,
  toggleVisitedAttribute,
} from './place.sql'
import { showPlaceDetailDTO } from '../dtos/place.dto'

import { selectUser } from './auth.sql'
import { selectUsername } from './user.sql'

export const addPlace = async (req) => {
  const {
    lat,
    lon,
    name,
    address,
    categoryId,
    recDish,
    closedDay,
    service,
    link,
    hashtag,
    images,
  } = req

  let conn
  const userId = 1 // 임시
  try {
    conn = await pool.getConnection()
    await conn.beginTransaction()

    const validHashtags = hashtag.filter((tag) => tag.trim() !== '')

    const hashtagIds = []
    for (const tag of validHashtags) {
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
      categoryId,
      recDish,
      closedDay.join(','),
      service.join(','),
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

export const showInitialPlaceInfo = async (user_id) => {

  try {
    const conn = await pool.getConnection()
    const [placeList] = await pool.query(selectAllPlace, user_id)
    const [user] = await pool.query(selectUsername, user_id)
    conn.release()

    return {
      "username": user[0].username,
      "placeList": placeList
    }
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const getPreferencePlacesList = async (
  user_id,
  category,
  sort,
  visit,
) => {
  let queryString = selectAllPlace
  let visitCondition = ''
  let categoryCondition = ''
  let sortCondition = ''

  // 가본 장소, 안가본 장소 조건
  if (visit === 3001) {
    visitCondition = ' AND user_place.is_visited = true'
  }

  if (visit === 3002) {
    visitCondition = ' AND user_place.is_visited = false'
  }

  // 카테고리 조건
  if (category.length > 0) {
    const categories = category.join(',')
    categoryCondition = ` AND place.category_id IN (${categories})`
  }

  // 정렬 조건
  if (sort === 2000) {
    sortCondition = ' ORDER BY place.created_at DESC'
  }

  if (sort === 2001) {
    sortCondition = ' ORDER BY place.name ASC' 
  }

  queryString += visitCondition
  queryString += categoryCondition
  queryString += sortCondition

  try {
    const conn = await pool.getConnection()
    const [placeList] = await pool.query(queryString, user_id)
    conn.release()

    return placeList
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const cancelPreferencePlace = async (user_id, place_id) => {
  // 유저/장소 존재 여부 확인
  const user = await pool.query(selectUser, user_id)
  const place = await pool.query(selectPlace, place_id)

  if (place[0].length === 0 || user[0].length === 0) {
    throw new BaseError(status.PLACE_IS_NOT_EXIST)
  }

  try {
    const conn = await pool.getConnection()
    const result = await pool.query(deletePreferencePlace, [user_id, place_id])
    conn.release()
    return result
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const addPreferencePlace = async (user_id, place_id) => {
  try {
    const conn = await pool.getConnection()
    const result = await pool.query(insertPreferencePlace, [user_id, place_id])
    conn.release()
    return result
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const getSearchPlace = async (req) => {
  const offset = (req.page - 1) * 10
  const limit = 10
  const conn = await pool.getConnection()
  const [rows] = await conn.query(selectSearchPlace, [
    req.user_id,
    `%${req.keyword}%`,
    offset,
    limit,
  ])
  conn.release()
  return rows
}

export const getPlaceDetail = async (placeId, userId) => {
  try {
    const conn = await pool.getConnection()

    const place = await conn.query(selectPlace, placeId)
    if (place[0].length === 0) {
      throw new BaseError(status.PLACE_IS_NOT_EXIST)
    }

    const placeData = await conn.query(selectPlaceDetail, [userId, placeId])
    const hashtag = await conn.query(selectPlaceHashtag, placeId)
    const images = await conn.query(selectPlaceImage, placeId)
    const formattedHashtags = hashtag[0].map((tag) => tag.name)
    const fotmattedImages = images[0].map((image) => image.url)

    const result = showPlaceDetailDTO(
      placeData[0],
      formattedHashtags,
      fotmattedImages,
    )
    conn.release()
    return result
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const toggleVisited = async (req) => {
  try {
    const conn = await pool.getConnection()
    const [result] = await pool.query(toggleVisitedAttribute, [
      req.user_id,
      req.placeId,
    ])
    conn.release()

    return result.changedRows
  } catch (err) {
    console.error(err)
  }
} 
