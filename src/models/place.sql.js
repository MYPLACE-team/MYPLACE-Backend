// 마플 장소 추가
export const insertPlace = `
    INSERT INTO place 
    (lat, lon, name, address, category_id, rec_dish, closed_day, service, link, uploader)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

// 마플장소 썸네일 추가
export const updatePlaceThumbnail = `
    UPDATE place SET thumbnail_url = ? WHERE id = ?`

// 존재하는 해시태그인지 확인
export const selectHashtag = `
    SELECT id FROM hashtag WHERE name = ?`

// 해시태그 추가
export const insertHashtag = `
    INSERT INTO hashtag (name) VALUES (?)`

// 장소-해시태그 추가
export const insertPlaceHashtag = `
    INSERT INTO place_hashtag (place_id, hashtag_id) VALUES (?, ?)`

// 장소-이미지 추가
export const insertPlaceImage = `
    INSERT INTO place_img (place_id, url) VALUES (?, ?)`
