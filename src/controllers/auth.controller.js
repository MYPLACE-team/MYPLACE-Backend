import { response, loginResponse } from '../../config/response.js'
import { status } from '../../config/response.status.js'
import { tokenVerify } from '../middlewares/jwt.middleware.js'

import { kakaoLogin } from '../services/auth.service.js'

export const authLogin = async (req, res) => {
  const provider = req.body.provider
  if (provider == 0) {
    console.log('카카오 로그인 요청!')
    return res.send(
      loginResponse(
        status.KAKAO_LOGIN_SUCCESS,
        await kakaoLogin(req.headers, req.body),
      ),
    )
  }
  //    else if (provider == 1) {
  //     console.log('구글 로그인 요청!')
  //     res.send(
  //       response(
  //         status.REGISTER_SUCCESS,
  //         await googleLogin(req.headers, req.body),
  //       ),
  //     )
  //   } else if (provider == 2) {
  //     console.log('애플 로그인 요청!')
  //     res.send(
  //       response(
  //         status.REGISTER_SUCCESS,
  //         await appleLogin(req.headers, req.body),
  //       ),
  //     )
  //   }
  res.send(response(status.INVAILD_PROVIDER, null))
}

//임시
export const authJWT = async (req, res) => {
  try {
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
