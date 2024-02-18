// 등록

// 폴더 생성
export const insertFolder = `
    INSERT INTO folder
    (name, thumbnail_img, date_start, date_end)
    VALUES (?, ?, ?, ?)
`

// 유저 폴더 등록
export const insertUserFolder = `
    INSERT INTO user_folder
    (user_id, folder_id)
    VALUES (?, ?)
    `
// 아카이브 글 등록
export const insertArchive = `
    INSERT INTO archive 
    (user_name, place_id, title, comment, score, menu, cost, visited_date, is_public, user_id)
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

// 아카이브-폴더 삭제(폴더 기반)
export const deleteArchiveFolderByFolderId = `
    DELETE FROM archive_folder WHERE folder_id = ?`

// 유저-폴더 삭제
export const deleteUserFolderByFolderId = `
    DELETE FROM user_folder WHERE folder_id = ?`

// 폴더 삭제
export const deleteFolder = `
    DELETE FROM folder WHERE id = ?`

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

// 아카이브 해시태그 조회
export const selectArchiveHashtags = `
    SELECT hashtag.id, hashtag.name
    FROM archive_hashtag
    JOIN hashtag ON archive_hashtag.hashtag_id = hashtag.id
    WHERE archive_hashtag.archive_id = ?`

// 아카이브 폴더 조회
export const selectArchiveFolder = `
    SELECT folder.id, folder.name
    FROM archive_folder
    JOIN folder ON archive_folder.folder_id = folder.id
    WHERE archive_folder.archive_id = ?`

export const selectArchive = `
    SELECT * FROM archive WHERE id = ?`

export const selectFolder = `
    SELECT * FROM folder WHERE id = ?`

// 유저의 폴더 정보 조회
export const selectUserFolder = `
    SELECT folder_id, name, thumbnail_img, date_start, date_end, user_id
    FROM folder
    JOIN user_folder ON user_folder.folder_id = folder.id
    WHERE user_folder.user_id = ?
    ORDER BY folder.id DESC`

export const selectMonthlyArchivesCount = `
    SELECT COUNT(*) AS month_archive_count
    FROM archive
    WHERE user_id = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ?;
`

// 유저의 아카이브 글 조회
export const selectUserArchiveCount = `
    SELECT
        COUNT(*) AS archive_count
    FROM archive
    WHERE user_id = ?`

// 해시태그 아이디 받아오기
export const selectHashtagIdByHashtagName = `
    SELECT
        id
    FROM hashtag
    WHERE name = ?`

// 유저의 아카이브 리스트 정보 조회
export const selectAllArchiveList = `
SELECT 
        a.id, a.score, a.user_id,
        p.name, p.address, p.category_id, p.thumbnail_url, p.id as place_id,
        GROUP_CONCAT(h0.id ORDER BY h0.id SEPARATOR '.') AS hashtag_ids,
        GROUP_CONCAT(h0.name) as hashtags
    FROM archive a
    JOIN place p ON a.place_id = p.id
    LEFT JOIN archive_hashtag ah0 ON a.id = ah0.archive_id
    LEFT JOIN hashtag h0 ON h0.id = ah0.hashtag_id
    WHERE a.user_id = ?
    GROUP BY a.id`

// pagenation 시에 LIMIT 10 OFFEST ? 구문 마지막에 추가 바람

export const selectArchiveListWithHashtag = `
${selectAllArchiveList}
HAVING hashtag_ids LIKE ?`
