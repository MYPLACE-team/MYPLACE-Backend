export const placeDto = {
  placeResponseDTO: (place) => {
    return {
      id: place.id,
    }
  },
}

export const showPreferencePlacesDTO = (placeList) => {
  let result = []
  placeList.forEach((place) => {
    result.push({
      id: place.id,
      name: place.name,
      address: place.address,
      categoryId: place.category_id,
      lat: place.lat,
      lon: place.lon
    })
  })

  return result
}

export const showPlaceDetailDTO = (placeData, hashtag, image) => {
  const place = placeData[0]

  return {
    id: place.id,
    name: place.name,
    address: place.address,
    categoryId: place.category_id,
    recDish: place.rec_dish,
    closedDay: place.closed_day.split(','),
    service: place.service.split(','),
    insta: place.link,
    hashtag: hashtag,
    images: image,
    writer: place.uploader_username,
    updatedAt: place.updated_at ? place.updated_at : place.created_at,
    isLike: place.isLike ? true : false,
  }
}

export const showPlaceListDTO = (placeList) => {
  let result = []
  placeList.forEach((place) => {
    result.push({
      id: place.id,
      name: place.name,
      address: place.address,
      categoryId: place.category_id,
      thumbnailUrl: place.thumbnail_url,
      isLike: place.isLike ? true: false
    })
  })

  return result
}
