import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'

import { postComplainPlace, showComplain } from '../models/complain.dao'

export const postComplainPlaceService = async (req, res) => {
  try {
    const result = await postComplainPlace(req, res)
    return result
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}

export const getComplainService = async (req, res) => {
  try {
    const result = await showComplain(req, res)
    return result
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}
