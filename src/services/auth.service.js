import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import { loginResponseDTO } from '../dtos/auth.dto'
import {
  getUserByEmail,
  addUser,
  getOauthByUserId,
  addOauth,
} from '../models/auth.dao'
import Axios from 'axios'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../config/jwt.config'

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
      console.log('expired token')
      return 'TOKEN_EXPIRED'
    } else if (err.message === 'invalid token') {
      console.log('invalid token')
      console.log('TOKEN_INVALID')
      return 'TOKEN_INVALID'
    } else {
      console.log(err.message)
      return err.message
    }
  }
  return decoded
}

//카카오 소셜로그인
export const kakaoLogin = async (headers, body) => {
  headers = headers['authorization']
  const kakaoToken = headers.split(' ')[1]
  const authInfo = await Axios.post(
    'https://kapi.kakao.com/v2/user/me',
    {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: 'Bearer ' + kakaoToken,
      },
    },
  )
  const email = authInfo.data.kakao_account.email
  const kakaoId = authInfo.data.id
  const username = body.username
  const provider = body.provider
  /*
  프로필 사진 업로드 기능 추가 예정
  */
  let profileImage =
    'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'
  if (body.profile_img) {
    profileImage = body.profile_img
  }

  if (!email || !kakaoId) throw new BaseError(status.ACCOUNT_INFO_ERROR)

  const user = await getUserByEmail(email)
  if (user == -1) {
    await addUser(username, email, profileImage, provider, kakaoId)
    const new_user = await getUserByEmail(email)
    return loginResponseDTO(new_user, await tokenSign(new_user[0]))
  } else {
    const oauth = await getOauthByUserId(user[0].id, provider)
    if (oauth == -1) {
      await addOauth(user[0].id, kakaoId, provider)
    }
    return loginResponseDTO(user, await tokenSign(user[0]))
  }
}

//구글 소셜로그인
export const googleLogin = async (headers, body) => {
  try {
    headers = headers['authorization']
    const googleToken = headers.split(' ')[1]
    const authInfo = await Axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        // Request Header에 Authorization 추가
        headers: {
          Authorization: `Bearer ${googleToken}`,
        },
      },
    )
    const email = authInfo.data.email
    const googleId = authInfo.data.id
    const username = body.username
    const provider = body.provider
    /*
  프로필 사진 업로드 기능 추가 예정
  */
    const profileImage =
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'

    if (!email || !googleId) throw new BaseError(status.ACCOUNT_INFO_ERROR)

    const user = await getUserByEmail(email)

    if (user == -1) {
      const new_user = await addUser(
        username,
        email,
        profileImage,
        provider,
        googleId,
      )
      return loginResponseDTO(new_user, await tokenSign(user[0]))
    } else {
      const oauth = await getOauthByUserId(user[0].id, provider)
      if (oauth == -1) {
        await addOauth(user[0].id, googleId, provider)
      }
      return loginResponseDTO(user, await tokenSign(user[0]))
    }
  } catch (err) {
    console.log(err)
  }
}
