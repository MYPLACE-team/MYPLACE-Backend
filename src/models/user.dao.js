import { pool } from '../../config/db.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import { getUserById, getArchiveById, CountPlaceById } from './user.sql'

export const getUserInfo = async (userId) => {
  const conn = await pool.getConnection()
  const [user] = await conn.query(getUserById, userId)
  if (user.length == 0) {
    return -1
  }
  try {
    const [archives] = await conn.query(getArchiveById, userId)
    const [places] = await conn.query(CountPlaceById, userId)
    const placeCount = places[0].cnt
    const archiveCount = archives.length

    let avgRate = 0
    archives.forEach((archive) => {
      avgRate += archive.score
    })
    avgRate /= archiveCount

    const result = { user, archiveCount, avgRate, placeCount }
    conn.release()
    return result
  } catch (err) {
    console.log('GETUSER ERR: ', err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}
