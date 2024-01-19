import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import { loginResponseDTO } from '../dtos/auth.dto'
import { getUserByEmail, addUser } from '../models/auth.dao'
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
  const result = jwt.sign(payload, jwtConfig.secretKey, jwtConfig.options)
  return result
}
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
  const profileImage =
    'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'

  if (!email || !kakaoId) throw new BaseError(status.ACCOUNT_INFO_ERROR)

  const user = await getUserByEmail(email)
  if (user == -1) {
    const new_user = await addUser(
      username,
      email,
      profileImage,
      provider,
      kakaoId,
    )
    return loginResponseDTO(new_user, await tokenSign(user))
  }
  return loginResponseDTO(user, await tokenSign(user))
}
