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
  removeFolderService,
  showArchiveUserService,
  showArchiveListService,
  editFolderService
} from '../services/archive.service.js'
import { BaseError } from '../../config/error.js'

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
    res.send(response(status.BAD_REQUEST))
  }
}

// 폴더 삭제
export const removeFolderController = async (req, res, next) => {
  const { folderId } = req.params
  try{
    const result = await removeFolderService(folderId)
    console.log('폴더 삭제 성공')
    res.send(response(status.REMOVE_FOLDER_SUCCESS))
  } catch (err){
    console.log('Error in removeFolderController', err)
    res.send(response(status.BAD_REQUEST))
  }
}

// 아카이브 리스트 조회
export const showArchiveListController = async(req, res) => {
  const userId = 1
  //console.log(req.query)
  const { tag } = req.query
  const { page } = req.query
  //console.log(tag, page)

  try{
    console.log('아카이브 글 목록 조회')
    const result = await showArchiveListService(userId, tag, page)
    res.send(response(status.SHOW_ARCHIVE_LIST_SUCCESS, result))
  } catch (err){
    console.error('Error in showArchiveListController', err)
    res.send(response(status.ARCHIVE_LIST_DOESNT_EXIST, []))
  }
}

// 폴더 정보 수정
export const editFolderController = async (req, res) => {
  const { folderId } = req.params

  try{
    console.log('폴더 정보 수정')
    const result = await editFolderService(folderId, req.body)

    if (result >= 1){
      res.send(response(status.SUCCESS))
    }
    
    else{
      throw new BaseError(status.BAD_REQUEST)
    }
  } catch (err){
    console.log('폴더 정보 수정 오류')
    res.send(response(status.BAD_REQUEST))
  }
}