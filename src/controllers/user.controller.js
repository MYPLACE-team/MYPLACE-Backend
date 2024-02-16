import { response } from '../../config/response.js'
import { status } from '../../config/response.status.js'

import { userGetInfoService } from '../providers/user.provider.js'

export const userGetInfoController = async (req, res) => {
  try {
    console.log('GET user Info : ', req.params.userId)
    return res.send(
      response(status.SUCCESS, await userGetInfoService(req.params.userId)),
    )
  } catch (err) {
    console.log('GET USER CTRL ERR: ', err)
    res.send(response(status.BAD_REQUEST, err.data.message))
  }
}
