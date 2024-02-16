import { response } from '../../config/response.js'
import { status } from '../../config/response.status.js'

import { userGetInfoProvide } from '../providers/user.provider.js'
import { userEditProfileService } from '../services/user.service.js'

export const userGetInfoController = async (req, res) => {
  try {
    console.log('GET user Info : ', req.params.userId)
    return res.send(
      response(status.SUCCESS, await userGetInfoProvide(req.params.userId)),
    )
  } catch (err) {
    console.log('GET USER CTRL ERR: ', err)
    res.send(response(status.BAD_REQUEST, err.data.message))
  }
}

export const userEditProfileController = async (req, res) => {
  try {
    console.log('Edit user Info : ', req.params.userId)
    const result = await userEditProfileService(req)
    if (result == -2) {
      return res.send(response(status.NAME_ALREADY_EXISTS, req.body.username))
    }
    return res.send(response(status.SUCCESS, result))
  } catch (err) {
    console.log('GET USER CTRL ERR: ', err)
    res.send(response(status.BAD_REQUEST, err.data.message))
  }
}
