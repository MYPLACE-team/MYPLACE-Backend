import { pool } from '../../config/db.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import { loginResponseDTO } from '../dtos/auth.dto'
import { tokenSign } from '../middlewares/jwt.middleware'
import { selectUser } from '../models/auth.sql'
export const tokenLogin = async (token) => {
  try {
    const conn = await pool.getConnection()
    console.log('Login process: ', token)
    const user = await conn.query(selectUser, token.result.id)
    console.log('Token Login Done!')
    return loginResponseDTO(user[0], token.access, token.refresh)
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG, err)
  }
}

export const newTokenLogin = async (token) => {
  try {
    const conn = await pool.getConnection()
    console.log('newTokenLogin process: ', token)
    const user = await conn.query(selectUser, token.userId)
    console.log('newTokenLogin 완료')
    return loginResponseDTO(user[0], await tokenSign(user[0][0]), token.refresh)
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG, err)
  }
}

export const newRefreshTokenLogin = async (token) => {
  try {
    const conn = await pool.getConnection()
    console.log('newTokenLogin process: ', token)
    const user = await conn.query(selectUser, token.userId)
    console.log('newTokenLogin 완료')
    return loginResponseDTO(user[0], await tokenSign(user[0][0]), token.refresh)
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG, err)
  }
}
