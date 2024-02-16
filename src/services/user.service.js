import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import { userResponseDTO } from '../dtos/user.dto'
import { editUserProfile } from '../models/user.dao'

export const userEditProfileService = async (req) => {
  try {
    const result = await editUserProfile(req.body)
    if (result == -2) {
      return -2
    }
    return userResponseDTO(result)
  } catch (err) {
    console.log('Edit USER CTRL ERR: ', err)
    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
}
