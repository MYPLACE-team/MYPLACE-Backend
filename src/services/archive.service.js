import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import {
  addArchiveFolder,
  addArchive,
  removeArchive,
  showArchiveUser,
  removeFolder,
  showArchiveList
} from '../models/archive.dao'

export const addArchiveFolderService = async (req) => {
  try {
    const result = await addArchiveFolder(req)
    return result
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const addArchiveService = async (req) => {
  try {
    const result = await addArchive(req)
    return result
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const removeArchiveService = async (req) => {
  try {
    const result = await removeArchive(req)
    return result
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const showArchiveUserService = async (req) => {
  try {
    const result = await showArchiveUser(req)
    return result
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const removeFolderService = async (req) => {
  try{
    const result = await removeFolder(req)
    return result
  } catch (err){
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const showArchiveListService = async (userId, tag, page) => {
  try{
    const result = await showArchiveList(userId, tag, page)
    return result
  } catch (err){
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}