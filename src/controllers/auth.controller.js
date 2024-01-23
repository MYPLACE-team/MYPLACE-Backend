import { response, loginResponse } from '../../config/response.js'
import { status } from '../../config/response.status.js'

import { kakaoLogin, googleLogin } from '../services/auth.service.js'

import Axios from 'axios'

export const authLogin = async (req, res) => {
  const provider = req.body.provider
  console.log('|||||||||||||||', provider, '||||||||||||||||')
  if (provider == '0') {
    console.log('카카오 로그인 요청!')
    return res.send(
      loginResponse(
        status.KAKAO_LOGIN_SUCCESS,
        await kakaoLogin(req.headers, req.body),
      ),
    )
  } else if (provider == '1') {
    console.log('구글 로그인 요청!')
    return res.send(
      response(
        status.REGISTER_SUCCESS,
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
}

//토큰 발급을 위한 임시 코드
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_CLIENT_ID =
  '748214384463-2i4defab1gab3d16eh6m0iu4ra318dv9.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
const GOOGLE_REDIRECT_URI = 'http://localhost:3000/auth'
export const authGoogleRedirectTest = async (req, res) => {
  const { code } = req.query
  console.log(`code: ${code}`)
  const resp = await Axios.post(GOOGLE_TOKEN_URL, {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code',
  })

  console.log(resp)
  return res.send('ok')
}
