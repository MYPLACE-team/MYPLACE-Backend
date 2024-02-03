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
