import { pool } from '../../config/db.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import { selectUsername } from './user.sql'
import { selectHashtag, insertHashtag } from './place.sql'
import {
  insertArchive,
  insertArchiveFolder,
  insertArchiveHashtag,
  insertArchiveImage,
  deleteArchive,
  deleteArchiveFolder,
  deleteArchiveHashtag,
  deleteArchiveImage,
  selectArchive,
} from './archive.sql'

export const addArchive = async (req) => {
  const conn = await pool.getConnection()
  const userId = 1 //임시

  try {
    // 유저네임 가져오기
    const usernameResult = await conn.query(selectUsername, 1)
    const username = usernameResult[0][0].username

    if (!username) {
      throw new BaseError(status.PARAMETER_IS_WRONG)
    }
    console.log('username', username)

    const insertResult = await conn.query(insertArchive, [
      username,
      req.placeId,
      req.title,
      req.comment,
      req.score,
      req.menu,
      req.cost,
      req.visitedDate,
      req.isPublic,
    ])

    const archiveId = insertResult[0].insertId

    // 해시태그 정보 저장
    const hashtagIds = []
    for (const tag of req.hashtag) {
      const [rows] = await conn.query(selectHashtag, [tag])
      if (rows.length > 0) {
        hashtagIds.push(rows[0].id)
      } else {
        const [result] = await conn.query(insertHashtag, [tag])
        hashtagIds.push(result.insertId)
      }
    }

    for (const hashtagId of hashtagIds) {
      await conn.query(insertArchiveHashtag, [archiveId, hashtagId])
    }

    // 이미지 정보 저장
    for (const imageUrl of req.images) {
      await conn.query(insertArchiveImage, [archiveId, imageUrl])
    }

    // 폴더 정보 저장
    await conn.query(insertArchiveFolder, [archiveId, req.folder])

    await conn.commit()

    conn.release()
    return archiveId
  } catch (error) {
    console.log(error)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const removeArchive = async (archiveId) => {
  console.log('archiveId', archiveId)
  const conn = await pool.getConnection()

  const archive = await conn.query(selectArchive, archiveId)

  if (archive[0].length === 0) {
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }

  try {
    await conn.beginTransaction()

    await conn.query(deleteArchiveFolder, [archiveId])
    await conn.query(deleteArchiveHashtag, [archiveId])
    await conn.query(deleteArchiveImage, [archiveId])
    await conn.query(deleteArchive, [archiveId])

    await conn.commit()

    conn.release()
    return archiveId
  } catch (error) {
    console.log(error)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}
