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
// 아카이브 글 수정
export const updateArchive = `
    UPDATE archive SET title = ?, comment = ?, score = ?, menu = ?, cost = ?, visited_date = ?, is_public = ? WHERE id = ?`

// 조회
// 아카이브 글 상세 조회
export const selectArchiveDetail = `
    SELECT 
        archive.*,
        user.username AS author_username,
        COUNT(archive.id) AS author_archive_count,
        GROUP_CONCAT(archive_img.url) AS image_urls
    FROM archive
    LEFT JOIN user ON archive.user_id = user.id
    LEFT JOIN archive_img ON archive.id = archive_img.archive_id
    WHERE archive.id = ?
    GROUP BY archive.id`
export const selectArchive = `
    SELECT * FROM archive WHERE id = ?`

export const selectFolder = `
    SELECT * FROM folder WHERE id = ?`

// 유저의 폴더 정보 조회
export const selectUserFolder = `
    SELECT * FROM folder WHERE user_id = ?`

export const selectMonthlyArchivesCount = `
  SELECT COUNT(*) AS month_archive_count
  FROM archive
  WHERE user_id = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ?;
`
