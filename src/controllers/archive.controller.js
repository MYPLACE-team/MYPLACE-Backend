import { status } from '../../config/response.status.js'
import { response } from '../../config/response.js'
import { addArchive, removeArchive } from '../models/archive.dao.js'

// 아카이브 글 작성
export const addArchiveController = async (req, res, next) => {
  try {
    const archiveId = await addArchive(req.body)
    console.log('아카이브 글 작성 성공')
    res.status(201).json(response(status.SUCCESS, { archiveId }))
  } catch (error) {
    console.error('Error in addArchiveController:', error)
    res.send(response(status.BAD_REQUEST, null))
  }
}

// 아카이브 글 삭제
export const removeArchiveController = async (req, res, next) => {
  const { archiveId } = req.params
  try {
    const result = await removeArchive(archiveId)
    console.log('아카이브 글 삭제 성공')
    res.status(200).json(response(status.SUCCESS, { archiveId }))
  } catch (error) {
    console.error('Error in deleteArchiveController:', error)
    res.send(response(status.BAD_REQUEST, null))
  }
}
