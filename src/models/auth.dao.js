//auth.dao.js
import { pool } from '../../config/db.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'

import { getUserByEmailSql, insertOauthSql, insertUserSql } from './auth.sql'

//카카오 id 값으로 Oauth 존재 확인
export const getUserByEmail = async (email) => {
  try {
    const conn = await pool.getConnection()
    const [user] = await pool.query(getUserByEmailSql, email)
    if (user.length == 0) {
      return -1
    }
    conn.release()
    return user
  } catch (err) {
    console.log('GET Oauth')
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

// User 등록
export const addUser = async (
  username,
  email,
  profileImage,
  provider,
  kakaoId,
) => {
  try {
    const conn = await pool.getConnection()
    const result = await pool.query(insertUserSql, [
      username,
      email,
      profileImage,
    ])
    await pool.query(insertOauthSql, [result[0].insertId, provider, kakaoId])
    conn.release()
    return result[0].insertId
  } catch (err) {
    console.log('ADDUSER')
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}
