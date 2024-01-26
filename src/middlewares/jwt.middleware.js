import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../config/jwt.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'

//토큰 생성
export const tokenSign = async (user) => {
  //현재는 username와 email을 payload로 넣었지만 필요한 값을 넣으면 됨!
  const payload = {
    username: user.username,
    email: user.email,
  }
  console.log(user)
  const result = jwt.sign(payload, jwtConfig.secretKey, jwtConfig.options)
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
      throw new BaseError(status.TOKEN_EXPIRED)
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
  return decoded
}
