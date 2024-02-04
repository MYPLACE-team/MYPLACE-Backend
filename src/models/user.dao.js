import { pool } from '../../config/db.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import { getUserById, getArchiveById, CountPlaceById } from './user.sql'

export const getUserInfo = async (userId) => {
  try {
    const conn = await pool.getConnection()
    const [user] = await conn.query(getUserById, userId)
    const [archives] = await conn.query(getArchiveById, userId)
    const [places] = await conn.query(CountPlaceById, userId)
    const placeCount = places[0].cnt
    const archiveCount = archives.length

    let avgRate = 0
    archives.forEach((archive) => {
      avgRate += archive.score
    })
    console.log(avgRate)
    avgRate /= archiveCount
    console.log(avgRate)
    console.log(userId + '는' + user)
    console.log(archives.length)
    if (user.length == 0) {
      return -1
    }

    const result = { user, archiveCount, avgRate, placeCount }
    conn.release()
    return result
  } catch (err) {
    console.log('GETUSER ERR: ', err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}
