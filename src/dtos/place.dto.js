export const placeDto = {
  placeResponseDTO: (place) => {
    return {
      id: place.id,
    }
  },
}

export const showPreferencePlacesDTO = (placeList) => {
  let result = []
  placeList.array.forEach((place) => {
    result.push({
      id: place.id,
      name: place.name,
      address: place.address,
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
    closedDay: place.closed_day,
    service: place.service,
    insta: place.link,
    hashtag: hashtag,
    images: image,
    writer: place.uploader_username,
    updatedAt: place.updated_at ? place.updated_at : place.created_at,
  }
}
