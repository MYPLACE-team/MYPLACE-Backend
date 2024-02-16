import { pool } from '../../config/db.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import {
  getUserById,
  getArchiveById,
  CountPlaceById,
  updateUserProfile,
  getProviderById,
  checkUsernameByname,
} from './user.sql'

export const getUserInfo = async (userId) => {
  const conn = await pool.getConnection()
  const [user] = await conn.query(getUserById, userId)
  if (user.length == 0) {
    return -1
  }
  try {
    const [archives] = await conn.query(getArchiveById, userId)
    const [places] = await conn.query(CountPlaceById, userId)
    const [oauth] = await conn.query(getProviderById, userId)
    const placeCount = places[0].cnt
    const archiveCount = archives.length
    let provider
    if (oauth[0].provider === '0') {
      provider = 'kakao'
    } else if (oauth[0].provider === '1') {
      provider = 'google'
    } else {
      provider = 'none'
    }
    let avgRate = 0
    archives.forEach((archive) => {
      avgRate += archive.score
    })
    avgRate /= archiveCount
    avgRate = Math.round(avgRate)
    const result = { user, archiveCount, avgRate, placeCount, provider }
    conn.release()
    return result
  } catch (err) {
    console.log('GETUSER ERR: ', err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const editUserProfile = async (req) => {
  const conn = await pool.getConnection()
  const userId = req.userId
  const [usernameChecker] = await conn.query(checkUsernameByname, req.username)
  if (usernameChecker.length != 0) {
    return -2
  }
  let [user] = await conn.query(getUserById, userId)
  if (user.length == 0) {
    return -1
  }

  const username = req.username.length === 0 ? user[0].username : req.username
  const profile = req.profile.length === 0 ? user[0].profile : req.profile
  const profileImg =
    req.profileImg.length === 0 ? user[0].profileImg : req.profileImg
  try {
    await conn.beginTransaction()
    await conn.query(updateUserProfile, [username, profile, profileImg, userId])
    const [archives] = await conn.query(getArchiveById, userId)
    const [places] = await conn.query(CountPlaceById, userId)
    const [oauth] = await conn.query(getProviderById, userId)
    const placeCount = places[0].cnt
    const archiveCount = archives.length
    let provider
    if (oauth[0].provider === '0') {
      provider = 'kakao'
    } else if (oauth[0].provider === '1') {
      provider = 'google'
    } else {
      provider = 'none'
    }

    let avgRate = 0
    archives.forEach((archive) => {
      avgRate += archive.score
    })
    avgRate /= archiveCount
    avgRate = Math.round(avgRate)
    const [user] = await conn.query(getUserById, userId)
    const result = { user, archiveCount, avgRate, placeCount, provider }
    conn.commit()
    conn.release()
    return result
  } catch (err) {
    console.log('GETUSER ERR: ', err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}
