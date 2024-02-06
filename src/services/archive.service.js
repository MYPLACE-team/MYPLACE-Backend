import { addArchive, removeArchive, showArchive } from '../models/archive.dao'

export const addArchiveService = async (req) => {
  let result
  try {
    result = await addArchive(req)
  } catch (err) {
    console.error(err)
  }

  return result
}

export const removeArchiveService = async (req) => {
  let result
  try {
    result = await removeArchive(req)
  } catch (err) {
    console.error(err)
  }

  return result
}

export const showArchiveService = async (userId, tag, page) => {
  try {
    const result = await showArchive(userId, tag, page)
    return result
  } catch (err) {
    console.error(err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}
