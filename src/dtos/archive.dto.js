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

export const showArchiveDetailDTO = (archive, place) => {
  return {
    place: {
      placeId: place.id,
      name: place.name,
      address: place.address,
      category: place.category,
      isLike: place.isLike,
      thumbnail: place.thumbnail,
    },
    archive: {
      archiveId: archive.id,
      title: archive.title,
      createdAt: archive.createdAt,
      count: archive.count,
      cost: archive.cost,
      menu: archive.menu,
      score: archive.score,
      comment: archive.comment,
      images: archive.images,
    },
  }
}
