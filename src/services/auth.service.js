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
import { tokenSign, tokenRefreshSign } from '../middlewares/jwt.middleware'

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
    const refresh = await tokenRefreshSign()
    await addUser(username, email, profileImage, provider, kakaoId, refresh)
    const new_user = await getUserByEmail(email)
    return loginResponseDTO(new_user, await tokenSign(new_user[0]))
  } else {
    const oauth = await getOauthByUserId(user[0].id, provider)
    if (oauth == -1) {
      await addOauth(user[0].id, kakaoId, provider)
    }
    return loginResponseDTO(
      user,
      await tokenSign(user[0]),
      oauth[0].access_token,
    )
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
