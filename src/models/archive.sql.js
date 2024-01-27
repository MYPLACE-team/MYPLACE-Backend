// 아카이브 글 등록
export const insertArchive = `
    INSERT INTO archive 
    (user_name, place_id, title, comment, score, menu, cost, visited_date, is_public)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
