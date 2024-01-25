//auth.dao.js
import { pool } from '../../config/db.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'

import {
  getUserByEmailSql,
  insertOauthSql,
  insertUserSql,
  getOauthByUserIdSql,
} from './auth.sql'

//email로 유저 존재 확인
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
    console.log('GET USER BY EMAIL')
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

//user_id 유저 oauth존재 확인
export const getOauthByUserId = async (userId, provider) => {
  try {
    const conn = await pool.getConnection()
    const [oauth] = await pool.query(getOauthByUserIdSql, [userId, provider])
    if (oauth.length == 0) {
      return -1
    }
    conn.release()
    return oauth
  } catch (err) {
    console.log('GET Oauth BY ID: ', err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

// User 등록
export const addUser = async (
  username,
  email,
  profileImage,
  provider,
  oauthId,
) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.beginTransaction()

    const result = await conn.query(insertUserSql, [
      username,
      email,
      profileImage,
    ])
    await conn.query(insertOauthSql, [result[0].insertId, oauthId, provider])
    await conn.commit()
    conn.release()
    return result[0].insertId
  } catch (err) {
    console.log('ADDUSER: ', err)

    try {
      if (conn) {
        await conn.rollback()
      }
    } catch (rollbackError) {
      console.error('Error in rollback:', rollbackError)
    }

    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

// Oauth 등록
export const addOauth = async (userId, OauthId, provider) => {
  let conn
  try {
    const conn = await pool.getConnection()
    const result = await pool.query(insertOauthSql, [userId, OauthId, provider])
    conn.release()
    return result[0].insertId
  } catch (err) {
    console.log('ADD Oauth: ', err)

    try {
      if (conn) {
        await conn.rollback()
      }
    } catch (rollbackError) {
      console.error('Error in rollback:', rollbackError)
    }

    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}
