import { pool } from '../../config/db.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import { selectUsername } from './user.sql'
import { selectHashtag, insertHashtag, selectPlacePreview } from './place.sql'
import {
  insertFolder,
  insertUserFolder,
  insertArchive,
  insertArchiveFolder,
  insertArchiveHashtag,
  insertArchiveImage,
  deleteArchive,
  deleteArchiveFolder,
  deleteArchiveHashtag,
  deleteArchiveImage,
  updateArchive,
  selectArchiveDetail,
  selectArchive,
  selectFolder,
  selectMonthlyArchivesCount,
  selectUserArchiveCount,
  selectIser,
  selectUserFolder,
  selectArchiveHashtags,
  deleteArchiveFolderByFolderId,
  deleteUserFolderByFolderId,
  deleteFolder,
  selectArchiveFolder,
} from './archive.sql'
import { selectUser } from './user.sql'
import { showArchiveDetailDTO, showArchiveUserDTO } from '../dtos/archive.dto'

export const addArchiveFolder = async (req) => {
  const conn = await pool.getConnection()
  const userId = 1 // 임시

  try {
    const [insertFolderResult] = await conn.query(insertFolder, [
      req.name,
      req.thumbnailImage,
      req.start,
      req.end,
    ])

    console.log(insertFolderResult)
    const folderId = insertFolderResult.insertId
    console.log(folderId)

    const userFolderResult = await conn.query(insertUserFolder, [
      userId,
      folderId,
    ])

    console.log(userFolderResult)

    return folderId
  } catch (err) {
    console.log(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const addArchive = async (req) => {
  const conn = await pool.getConnection()
  const userId = 1 //임시

  try {
    // // 유저네임 가져오기
    const usernameResult = await conn.query(selectUsername, [userId])
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
      userId,
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

export const editArchive = async (archiveId, req) => {
  const conn = await pool.getConnection()

  try {
    await conn.beginTransaction()

    // 아카이브 존재 여부 확인
    const archive = await conn.query(selectArchive, [archiveId])

    if (archive[0].length === 0) {
      throw new BaseError(status.PARAMETER_IS_WRONG)
    }

    await conn.query(updateArchive, [
      req.title,
      req.comment,
      req.score,
      req.menu,
      req.cost,
      req.visitedDate,
      req.isPublic,
      archiveId,
    ])

    // 기존 해시태그 및 이미지 정보 삭제
    await conn.query(deleteArchiveHashtag, [archiveId])
    await conn.query(deleteArchiveImage, [archiveId])

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

    await conn.commit()

    conn.release()
    return archiveId
  } catch (error) {
    console.log(error)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

// 아카이브 글 상세보기
export const showArchiveDetail = async (archiveId) => {
  const userId = 1 //임시
  const conn = await pool.getConnection()
  console.log('archiveId', archiveId)

  try {
    const archiveResult = await conn.query(selectArchiveDetail, [archiveId])
    const archiveData = archiveResult[0][0]

    console.log('archiveData', archiveData)

    if (!archiveData) {
      throw new BaseError(status.PARAMETER_IS_WRONG)
    }

    const placeResult = await conn.query(selectPlacePreview, [
      userId,
      archiveData.place_id,
    ])
    const placeData = placeResult[0][0]

    const folderResult = await conn.query(selectArchiveFolder, archiveId)
    const folder = folderResult[0][0]

    const archive = {
      id: archiveData.id,
      title: archiveData.title,
      createdAt: archiveData.created_at,
      cost: archiveData.cost,
      menu: archiveData.menu,
      score: archiveData.score,
      comment: archiveData.comment,
      images: archiveData.image_urls,
      count: archiveData.author_archive_count,
      visite: archiveData.visited_date,
      isPublic: archiveData.is_public ? true : false,
      folder: folder,
    }

    const place = {
      id: placeData.id,
      name: placeData.name,
      address: placeData.address,
      category: placeData.category_id,
      isLike: placeData.isLike,
      thumbnail: placeData.thumbnail_url,
    }

    const hashtagsResult = await conn.query(selectArchiveHashtags, archiveId)
    const hashtags = hashtagsResult[0].map((tag) => tag.name)

    const responseDTO = showArchiveDetailDTO(archive, place, hashtags)

    conn.release()
    return responseDTO
  } catch (error) {
    console.log(error)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const showArchiveUser = async (userId) => {
  const conn = await pool.getConnection()

  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  try {
    const user = await conn.query(selectUser, userId)
    const folder = await conn.query(selectUserFolder, userId)
    const count = await conn.query(selectMonthlyArchivesCount, [
      userId,
      year,
      month,
    ])
    const archiveCount = await conn.query(selectUserArchiveCount, userId)
    const responseDTO = showArchiveUserDTO(
      user[0][0],
      folder[0],
      count[0][0].month_archive_count,
      archiveCount[0][0].archive_count,
    )

    return responseDTO
  } catch (error) {
    console.log(error)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const removeFolder = async (folderId) => {
  const conn = await pool.getConnection()

  try {
    await conn.query(deleteArchiveFolderByFolderId, folderId)
    await conn.query(deleteUserFolderByFolderId, folderId)
    const result = await conn.query(deleteFolder, folderId)

    return result
  } catch (err) {
    console.log(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}
