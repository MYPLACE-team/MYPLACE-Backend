import { addArchive, removeArchive } from '../models/archive.dao'

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
