// login response DTO
export const loginResponseDTO = (user, accessToken, refreshToken) => {
  user = user[0]
  console.log(user)
  return {
    userId: user.id,
    email: user.email,
    username: user.username,
    profile_img: user.profile_img,
    accessToken: accessToken,
    refreshToken: refreshToken,
  }
}
