import {
  addArchive,
  removeArchive,
  showArchiveUser,
} from '../models/archive.dao'

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
