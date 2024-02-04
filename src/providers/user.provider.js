import { userResponseDTO } from '../dtos/user.dto'
import { getUserInfo } from '../models/user.dao'

export const userGetInfoService = async (userId) => {
  return userResponseDTO(await getUserInfo(userId))
}
