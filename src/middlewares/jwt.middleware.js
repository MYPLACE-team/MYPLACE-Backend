import pool from '../../config/db.config'
import jwt from 'jsonwebtoken'
import { jwtConfig, jwtRefreshConfig } from '../../config/jwt.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'

//토큰 생성
export const tokenSign = async (user) => {
  //현재는 username와 email을 payload로 넣었지만 필요한 값을 넣으면 됨!
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  }
  console.log(user)
  const result = jwt.sign(payload, jwtConfig.secretKey, jwtConfig.options)
  return result
}

export const tokenRefreshSign = async () => {
  //현재는 username와 email을 payload로 넣었지만 필요한 값을 넣으면 됨!
  const result = jwt.sign({}, jwtConfig.secretKey, jwtRefreshConfig.options)
  return result
}

//토큰 인증
export const tokenVerify = async (token) => {
  let decoded
  try {
    // verify를 통해 값 decode!
    decoded = jwt.verify(token, jwtConfig.secretKey)
  } catch (err) {
    if (err.message === 'jwt expired') {
      console.log('TOKEN_EXPIRED')
      return decoded
    } else if (err.message === 'invalid token') {
      console.log('TOKEN_INVALID')
      throw new BaseError(status.TOKEN_INVAILD)
    } else if (err.message === 'invalid signature') {
      console.log('TOKEN_SIGNITURE')
      throw new BaseError(status.TOKEN_SIGNITURE)
    } else {
      console.log(err.message)
      throw new BaseError(status.TOKEN_ERROR)
    }
  }
  console.log(decoded)
  return decoded
}

//토큰 인증
export const tokenCheck = async (req, res, next) => {
  if (req.headers['access'] === undefined) throw BaseError(status.TOKEN_ERROR)

  const accessToken = tokenVerify(req.headers['access'])
  const refreshToken = tokenVerify(req.headers['refresh']) // *실제로는 DB 조회

  if (accessToken === undefined) {
    if (refreshToken === undefined) {
      console.log('CASE 1')
      // case1: access token과 refresh token 모두가 만료된 경우
      throw BaseError(status.TOKEN_LOGIN)
    } else {
      console.log('CASE 2')
      // case2: access token은 만료됐지만, refresh token은 유효한 경우
      /**
       *  DB를 조회해서 payload에 담을 값들을 가져오는 로직
       */
      const conn = await pool.getConnection()
      const user = await conn.query(
        'SELECT * FROM USER WHERE id = ?;',
        req.body.userId,
      )
      console.log(user)
      const newAccessToken = tokenSign(user)
      res.cookie('access', newAccessToken)
      req.cookies.access = newAccessToken
      return newAccessToken
    }
  } else {
    if (refreshToken === undefined) {
      console.log('CASE 3')
      // case3: access token은 유효하지만, refresh token은 만료된 경우
      let conn
      try {
        const newRefreshToken = tokenRefreshSign()
        conn = await pool.getConnection()
        await conn.beginTransaction()

        const user = await conn.query(
          'SELECT * FROM USER WHERE id = ?;',
          req.body.userId,
        )
        await conn.query(
          `UPDATE oauthid 
          SET access_toekn = ?
          WHERE user_id = ?;`,
          [newRefreshToken, user[0].id],
        )
        await conn.commit()
        conn.release()
        res.cookie('refresh', newRefreshToken)
        req.cookies.refresh = newRefreshToken
        return newRefreshToken
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
    } else {
      // case4: accesss token과 refresh token 모두가 유효한 경우
      const result = tokenVerify(accessToken)
      console.log(result)
      return result
    }
  }
}
