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

// 유저가 선택한 장소 전체 조회
export const selectAllPlace = `
    SELECT 
        place.name, 
        place.address, 
        place.id,
        place.category_id,
        place.lat,
        place.lon,
        place.thumbnail_url,
        user_place.is_visited
  FROM user_place 
  JOIN place ON user_place.place_id = place.id 
  WHERE user_place.user_id = ?`

// 장소 프리뷰 조회
export const selectPlacePreview = `
    SELECT 
        place.id, 
        place.name, 
        place.address, 
        place.category_id, 
        place.thumbnail_url,
    CASE WHEN user_place.place_id IS NULL THEN 0 ELSE 1 END AS isLike
    FROM place LEFT JOIN user_place ON place.id = user_place.place_id AND user_place.user_id = ?
    WHERE place.id = ?`

// 관심장소 취소
export const deletePreferencePlace = `
    DELETE FROM user_place WHERE user_id = ? AND place_id = ?`

// 장소 조회
export const selectPlace = `
    SELECT * FROM place WHERE id = ?`

// 관심장소 추가
export const insertPreferencePlace = `
    INSERT INTO user_place (user_id, place_id) VALUES (?, ?)`

// 장소 검색
export const selectSearchPlace = `
    SELECT
        place.id,
        place.name,
        place.address,
        place.category_id,
        place.thumbnail_url,
    CASE WHEN user_place.place_id IS NOT NULL THEN TRUE ELSE FALSE END AS isLike
    FROM place LEFT JOIN user_place ON place.id = user_place.place_id AND user_place.user_id = ?
    WHERE place.name LIKE ?;
`

// 장소 상세 조회
export const selectPlaceDetail = `
    SELECT
        place.id,
        place.name,
        place.address,
        place.category_id,
        place.rec_dish,
        place.closed_day,
        place.service,
        place.link,
        user.username AS uploader_username,
        place.uploader,
        place.created_at,
        place.updated_at,
    CASE WHEN user_place.place_id IS NOT NULL THEN TRUE ELSE FALSE END AS isLike
    FROM place
    LEFT JOIN user_place ON place.id = user_place.place_id AND user_place.user_id = ?
    LEFT JOIN user ON place.uploader = user.id
    WHERE place.id = ?`

// 장소 이미지 조회
export const selectPlaceImage = `
    SELECT url FROM place_img WHERE place_id = ?`

// 장소 해시태그 조회
export const selectPlaceHashtag = `
    SELECT hashtag.name
    FROM place_hashtag
    JOIN hashtag ON place_hashtag.hashtag_id = hashtag.id
    WHERE place_hashtag.place_id = ?`
// visited 여부 toggle
export const toggleVisitedAttribute = `
    UPDATE 
        user_place
    SET is_visited = if(is_visited = 1, 0, 1)
    WHERE user_id = ?
    AND place_id = ?
`
