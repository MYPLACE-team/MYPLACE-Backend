// login response DTO
export const loginResponseDTO = (user, access_token) => {
  user = user[0]
  return {
    userId: user.id,
    email: user.email,
    username: user.username,
    profile_img: user.profile_img,
    access_Token: access_token,
  }
}
