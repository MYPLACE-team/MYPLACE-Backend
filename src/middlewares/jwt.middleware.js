import { pool } from '../../config/db.config'
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
      return 'TOKEN_EXPIRED'
    } else if (err.message === 'invalid token') {
      console.log('TOKEN_INVALID')
      return 'TOKEN_INVALID'
    } else if (err.message === 'invalid signature') {
      console.log('TOKEN_SIGNITURE')
      return 'TOKEN_INVAILD_SIGNITURE'
    } else if (err.message === 'jwt malformed') {
      console.log('TOKEN_INVALID')
      return 'TOKEN_INVALID'
    } else {
      console.log(err.message)
      throw new BaseError(status.TOKEN_ERROR)
    }
  }
  return decoded
}

//토큰 인증
export const tokenResponseDTO = (
  status = -1,
  result = null,
  refresh = null,
  access = null,
  userId = null,
) => {
  return {
    status: status, //-1 재로그인, 1 토큰 로그인 & refresh 재발급 후 로그인, 2 access 재발급 후 로그인
    result: result,
    refresh: refresh, //로그인 시 반환할 refresh 토큰. 만료시 자동 재발급
    access: access, //로그인 시 반환할 refresh 토큰. 만료시 자동 재발급
    userId: userId, //access 만료 시 refresh를 통해 userId 제공 -> 로그인 진행
  }
}

export const tokenCheck = async (req, res) => {
  if (req.headers['access'] === undefined)
    throw new BaseError(status.TOKEN_ERROR)
  const accessToken = await tokenVerify(req.headers['access'])
  const refreshToken = await tokenVerify(req.headers['refresh']) // *실제로는 DB 조회
  console.log(accessToken, refreshToken)
  if (
    accessToken === 'TOKEN_INVALID' ||
    accessToken === 'TOKEN_INVAILD_SIGNITURE' ||
    refreshToken === 'TOKEN_INVAILD_SIGNITURE'
  ) {
    console.log('case 0')
    return tokenResponseDTO(-1, '유효하지 않은 토큰. 재로그인 필요.')
  }
  if (accessToken === 'TOKEN_EXPIRED') {
    if (refreshToken === 'TOKEN_EXPIRED') {
      console.log('CASE 1-1')
      // case1: access token과 refresh token 모두가 만료된 경우
      return tokenResponseDTO(-1, '토큰 만료. 재로그인 필요.')
    } else if (refreshToken === 'TOKEN_INVALID') {
      console.log('CASE 1-2')
      // case1: access token과 refresh token 모두가 만료된 경우
      return tokenResponseDTO(-1, '토큰 만료. 재로그인 필요.')
    } else {
      console.log('CASE 2')
      // case2: access token은 만료됐지만, refresh token은 유효한 경우
      /**
       *  DB를 조회해서 payload에 담을 값들을 가져오는 로직
       */
      const conn = await pool.getConnection()
      const [user] = await conn.query(
        `SELECT user_id FROM oauthid WHERE access_token = '${req.headers['refresh']}';`,
      )
      console.log(user[0])
      // res.cookie('access', newAccessToken)
      // req.cookies.access = newAccessToken
      const newAccessToken = await tokenSign(user[0])
      res.set('access', newAccessToken)
      return tokenResponseDTO(
        2,
        accessToken,
        req.headers['refresh'],
        newAccessToken,
        user[0].user_id,
      )
    }
  } else {
    if (refreshToken === 'TOKEN_INVALID' || refreshToken === 'TOKEN_EXPIRED') {
      console.log('CASE 3')
      // case3: access token은 유효하지만, refresh token은 만료된 경우
      let conn
      try {
        const newRefreshToken = await tokenRefreshSign()
        conn = await pool.getConnection()
        await conn.beginTransaction()
        console.log(accessToken)
        const [user] = await conn.query(
          'SELECT * FROM USER WHERE id = ?;',
          accessToken.id,
        )
        console.log(user[0])
        await conn.query(
          `UPDATE oauthid 
          SET access_token = '${newRefreshToken}'
          WHERE user_id = ${user[0].id};`,
        )
        await conn.commit()
        conn.release()
        //res.cookie('refresh', newRefreshToken)
        //req.cookies.refresh = newRefreshToken
        res.set('access', newRefreshToken)
        return tokenResponseDTO(1, accessToken, newRefreshToken, user[0].id)
      } catch (err) {
        console.log('JWT: ', err)

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
      console.log('Case4')
      return tokenResponseDTO(
        1,
        accessToken,
        req.headers['refresh'],
        req.headers['access'],
      )
    }
  }
}
