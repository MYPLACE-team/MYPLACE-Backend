import { status } from '../../config/response.status.js'
import { response } from '../../config/response.js'
import { addArchive } from '../models/archive.dao.js'

// 아카이브 글 작성
export const addArchiveController = async (req, res, next) => {
  try {
    const archiveId = await addArchive(req.body)
    console.log('아카이브 글 작성 성공')
    res.status(201).json(response(status.SUCCESS, { archiveId }))
  } catch (error) {
    console.error('Error in addArchiveController:', error)
    res.status(error.status || 500).json(response(error.code, null))
  }
}
