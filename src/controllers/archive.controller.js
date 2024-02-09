import { status } from '../../config/response.status.js'
import { response } from '../../config/response.js'
import {
  addArchive,
  removeArchive,
  editArchive,
  showArchiveDetail,
} from '../models/archive.dao.js'

import { 
  addArchiveFolderService,
  showArchiveUserService 
} from '../services/archive.service.js'

// 아카이브 폴더 생성
export const addArchiveFolderController = async (req, res) => {
  try {
    const folderId = await addArchiveFolderService(req.body)
    console.log('폴더 생성')
    res.status(201).json(response(status.SUCCESS, folderId))
  } catch (err) {
    console.error('Error in addArchiveFolderController', err)
    res.send(response(status.BAD_REQUEST, null))
  }
}

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

// 아카이브 유저정보 조회
export const showArchiveUserController = async (req, res, next) => {
  const userId = 1 // 임시
  try {
    const result = await showArchiveUserService(userId)
    console.log('아카이브 유저정보 조회 성공')
    res.status(200).json(response(status.SUCCESS, result))
  } catch (error) {
    console.error('Error in showArchiveUserController:', error)
    res.send(response(status.BAD_REQUEST, null))
  }
}
