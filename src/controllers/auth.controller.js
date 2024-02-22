import { response } from '../../config/response.js'
import { status } from '../../config/response.status.js'
import { tokenVerify, tokenCheck } from '../middlewares/jwt.middleware.js'

import { kakaoLogin, googleLogin } from '../services/auth.service.js'

import Axios from 'axios'

//임시
import dotenv from 'dotenv'
import {
  newRefreshTokenLogin,
  newTokenLogin,
  tokenLogin,
} from '../providers/auth.provider.js'
dotenv.config()

export const authLogin = async (req, res) => {
  try {
    //토큰 확인
    const tokenResult = await tokenCheck(req, res)

    //Access토큰이 유효한 경우
    if (tokenResult.status == 1) {
      console.log('Token로그인 요청: ', tokenResult)
      return res.send(
        response(status.TOKEN_LOGIN_SUCCESS, await tokenLogin(tokenResult)),
      )
    }
    //Access토큰은 만료, Refresh토큰이 유효한 경우
    else if (tokenResult.status == 2) {
      console.log('newToken로그인 요청: ', tokenResult)
      return res.send(
        response(status.TOKEN_LOGIN_SUCCESS, await newTokenLogin(tokenResult)),
      )
    }
    //Access토큰은 유효, Refresh토큰이 만료된 경우
    else if (tokenResult.status == 3) {
      console.log('newRefreshToken로그인 요청: ', tokenResult)
      return res.send(
        response(
          status.TOKEN_LOGIN_SUCCESS,
          await newRefreshTokenLogin(tokenResult),
        ),
      )
    }
    //Access, Refresh 토큰이 없거나, 만료,이상인 경우
    else if (tokenResult.status == -1) {
      //return res.send(response(status.TOKEN_INVAILD, tokenResult.message))
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
    }
    return res.send(response(status.TOKEN_ERROR, null))
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

//임시
export const authJWT = async (req, res) => {
  try {
    console.log(req.headers['token'])
    return res.send(
      response(status.SUCCESS, await tokenVerify(req.headers['token'])),
    )
  } catch (err) {
    return res.send(err.data)
  }
}

export const authUpload = async (req, res) => {
  console.log(req, res)
  const filePath = req.file
  if (!filePath) {
    console.log('err')
  }
  console.log(filePath)
  res.sned(filePath)
}
