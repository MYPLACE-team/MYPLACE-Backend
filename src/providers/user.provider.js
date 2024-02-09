import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import { userResponseDTO } from '../dtos/user.dto'
import { getUserInfo } from '../models/user.dao'

export const userGetInfoService = async (userId) => {
  const result = await getUserInfo(userId)
  if (result == -1) {
    throw new BaseError(status.USER_NOT_EXISTS)
  }
  return userResponseDTO(result)
}
