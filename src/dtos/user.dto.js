// user response DTO
export const userResponseDTO = (result) => {
  console.log(result)
  const user = result.user[0]

  return {
    userId: user.id,
    email: user.email,
    username: user.username,
    profileImg: user.profile_img,
    profile: user.profile,
    level: user.level,
    point: user.point,
    placeCount: result.placeCount,
    archiveCount: result.archiveCount,
    avgRate: result.avgRate,
  }
}
