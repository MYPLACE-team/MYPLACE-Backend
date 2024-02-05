import { pool } from '../../config/db.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'

import {
  insertPlace,
  selectHashtag,
  insertHashtag,
  insertPlaceHashtag,
  insertPlaceImage,
  selectAllPlace,
  deletePreferencePlace,
  selectPlace,
  insertPreferencePlace,
  selectSearchPlace,
  toggleVisitedAttribute
} from './place.sql'

import { selectUser } from './auth.sql'

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

    const hashtags = hashtag.split(',')
    const hashtagIds = []

    for (const tag of hashtags) {
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

    console.log('result', result)
    const placeId = result.insertId

    console.log('placeId', placeId)

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
    sortCondition = ' ORDER BY place.name ASC'
  }

  if (sort === 2001) {
    sortCondtion = ' ORDER BY place.created_at ASC'
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

export const toggleVisited = async (req) => {
  try{
    const conn = await pool.getConnection()
    const [result] = await pool.query(toggleVisitedAttribute, [
      req.user_id,
      req.place_id
    ])
    conn.release()

    return result.changedRows
  } catch (err){
    console.error(err);
  }
}
