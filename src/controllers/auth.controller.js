import { response } from '../../config/response.js'
import { status } from '../../config/response.status.js'

import { kakaoLogin, googleLogin } from '../services/auth.service.js'

import Axios from 'axios'

//임시
import dotenv from 'dotenv'
dotenv.config()

export const authLogin = async (req, res) => {
  try {
    const provider = req.body.provider
    if (provider == '0') {
      console.log('카카오 로그인 요청!')
      return res.send(
        response(
          status.KAKAO_LOGIN_SUCCESS,
          await kakaoLogin(req.headers, req.body),
        ),
      )
    } else if (provider == '1') {
      console.log('구글 로그인 요청!')
      return res.send(
        response(
          status.GOOGLE_LOGIN_SUCCESS,
          await googleLogin(req.headers, req.body),
        ),
      )
    } //else if (provider == 2) {
    //     console.log('애플 로그인 요청!')
    //     res.send(
    //       response(
    //         status.REGISTER_SUCCESS,
    //         await appleLogin(req.headers, req.body),
    //       ),
    //     )
    //   }
    return res.send(response(status.INVAILD_PROVIDER, null))
  } catch (err) {
    console.log('LoginController Err: ', err)
    return res.send(response(status.CONTROL_ERROR, null))
  }
}

//임시
//토큰 발급을 위한 임시 코드
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
export const authGoogleRedirectTest = async (req, res) => {
  const { code } = req.query
  console.log(`code: ${code}`)
  const resp = await Axios.post(GOOGLE_TOKEN_URL, {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code',
  })

  console.log(resp)
  return res.send('ok')
}
