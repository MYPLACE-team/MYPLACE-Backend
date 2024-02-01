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
  selectFolder,
} from './archive.sql'

export const addArchive = async (req) => {
  const conn = await pool.getConnection()
  const userId = 1 //임시

  try {
    // 유저네임 가져오기
    const usernameResult = await conn.query(selectUsername, 1)
    const username = usernameResult[0][0].username

    // 폴더 존재 여부 확인
    const folder = await conn.query(selectFolder, [req.folder])

    if (!username || !folder) {
      throw new BaseError(status.PARAMETER_IS_WRONG)
    }

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
