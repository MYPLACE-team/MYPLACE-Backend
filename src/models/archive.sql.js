// 등록
// 아카이브 글 등록
export const insertArchive = `
    INSERT INTO archive 
    (user_name, place_id, title, comment, score, menu, cost, visited_date, is_public, user_id, thumbnail)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`

// 아카이브-이미지 추가
export const insertArchiveImage = `
    INSERT INTO archive_img (archive_id, url) VALUES (?, ?)`

// 아카이브-해시태그 추가
export const insertArchiveHashtag = `
    INSERT INTO archive_hashtag (archive_id, hashtag_id) VALUES (?, ?)`

//아카이브-폴더 추가
export const insertArchiveFolder = `
    INSERT INTO archive_folder (archive_id, folder_id) VALUES (?, ?)`

// 삭제
// 아카이브 글 삭제
export const deleteArchive = `
    DELETE FROM archive WHERE id = ?`

// 아카이브-이미지 삭제
export const deleteArchiveImage = `
    DELETE FROM archive_img WHERE archive_id = ?`

// 아카이브-해시태그 삭제
export const deleteArchiveHashtag = `
    DELETE FROM archive_hashtag WHERE archive_id = ?`

// 아카이브-폴더 삭제
export const deleteArchiveFolder = `
    DELETE FROM archive_folder WHERE archive_id = ?`

// 수정
// 존재하는 글인지 확인
export const selectArchive = `
        SELECT id FROM archive WHERE place_id = ? AND user_id = ?`

// 아카이브 글 수정
export const updateArchive = `
    UPDATE archive SET title = ?, comment = ?, score = ?, menu = ?, cost = ?, visited_date = ?, is_public = ? WHERE id = ?`
