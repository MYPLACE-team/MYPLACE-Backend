import { addArchive } from '../models/archive.dao'

export const addArchiveService = async (req) => {
  let result
  try {
    result = await addArchive(req)
  } catch (err) {
    console.error(err)
  }

  console.log(result)
  return result
}
