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

export const showArchiveDetailDTO = (archive, place, hashtags) => {
  return {
    place: {
      placeId: place.id,
      name: place.name,
      address: place.address,
      categoryId: place.category,
      isLike: place.isLike,
      thumbnail: place.thumbnail,
    },
    archive: {
      archiveId: archive.id,
      title: archive.title,
      createdAt: archive.createdAt,
      count: archive.count,
      price: archive.cost,
      menu: archive.menu,
      score: archive.score,
      comment: archive.comment,
      images: archive.images.split(','),
      hashtag: hashtags,
      visitedDate: archive.visite,
      isPublic: archive.isPublic,
      folder: archive.folder,
    },
  }
}

export const showArchiveUserDTO = (user, folder, count, archiveCount) => {
  return {
    user: {
      userId: user.id,
      username: user.username,
      profileImg: user.profile_img,
      monthPlaceCount: count,
      level: user.level,
      archiveCount: archiveCount,
    },
    folder: folder.map((folder) => {
      return {
        folderId: folder.folder_id,
        title: folder.name,
        dateStart: folder.date_start,
        dateEnd: folder.date_end,
        image: folder.thumbnail_img,
      }
    }),
  }
}

export const showArchiveListDTO = (archiveList) => {
  //console.log(archiveList)

  return archiveList.map((archive) => ({
    id: archive.id,
    score: archive.score,
    userId: archive.user_id,
    name: archive.name,
    address: archive.address,
    categoryId: archive.category_id,
    thumbnailUrl: archive.thumbnail_url,
    hashtag: archive.hashtags !== null ? archive.hashtags.split(',') : []
  }))

  //console.log(archiveList)

  // return archiveList
}