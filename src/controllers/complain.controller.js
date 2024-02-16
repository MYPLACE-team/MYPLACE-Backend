import { response } from '../../config/response.js'
import { status } from '../../config/response.status.js'
import {
  postComplainPlaceService,
  getComplainService,
} from '../services/complain.service.js'

export const complainPlaceController = async (req, res) => {
  console.log('유저가 장소 신고를 요청하였습니다')
  try {
    const result = await postComplainPlaceService(req, res)
    res.send(response(status.SUCCESS, result))
  } catch (error) {
    console.log('POST COMPLAIN CTRL ERR: ', error)
    res.send(response(status.BAD_REQUEST, null))
  }
}

export const getComplainController = async (req, res) => {
  console.log('유저가 문의 정보를 요청하였습니다')
  try {
    const result = await getComplainService(req, res)
    res.send(response(status.SUCCESS, result))
  } catch (error) {
    console.log('GET COMPLAIN CTRL ERR: ', error)
    res.send(response(status.BAD_REQUEST, null))
  }
}
