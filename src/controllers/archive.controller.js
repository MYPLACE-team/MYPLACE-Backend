import { status } from '../../config/response.status.js'
import { response } from '../../config/response.js'
import {
  addArchive,
  removeArchive,
  editArchive,
  showArchiveDetail,
} from '../models/archive.dao.js'
import { showArchiveService } from '../services/archive.service.js'

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

// 아카이브 글 수정
export const editArchiveController = async (req, res, next) => {
  const { archiveId } = req.params
  try {
    const result = await editArchive(archiveId, req.body)
    console.log('아카이브 글 수정 성공')
    res.status(201).json(response(status.SUCCESS, { archiveId }))
  } catch (error) {
    console.error('Error in editArchiveController:', error)
    res.send(response(status.BAD_REQUEST, null))
  }
}

// 아카이브 글 상세 조회
export const showArchiveDetailController = async (req, res, next) => {
  const { archiveId } = req.params
  try {
    const result = await showArchiveDetail(archiveId)
    console.log('아카이브 글 상세 조회 성공')
    res.status(201).json(response(status.SUCCESS, result))
  } catch (error) {
    console.error('Error in showArchiveDetailController:', error)
    res.send(response(status.BAD_REQUEST, null))
  }
}

// 아카이브 글 목록 조회/검색
export const showArchiveController = async (req, res, next) => {
  const userId = 0 // 임시
  const { tag } = req.query
  const { page } = req.query

  try {
    const result = await showArchiveService(userId, tag, page)
    console.log('아카이브 글 목록 조회 성공')
    res.status(200).json(response(status.SUCCESS, result))
  } catch (error) {
    console.error('Error in showArchiveController:', error)
    res.send(response(status.BAD_REQUEST, null))
  }
}
