import { response } from '../../config/response.js'
import { status } from '../../config/response.status.js'

import { userGetInfoService } from '../providers/user.provider.js'

export const userGetInfoController = async (req, res) => {
  console.log('GET user Info : ', req.params.userId)
  return res.send(
    response(status.SUCCESS, await userGetInfoService(req.params.userId)),
  )
}
