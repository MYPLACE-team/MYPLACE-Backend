//이메일로 존재하는 유저인지 확인
export const getUserByEmailSql = 'SELECT * FROM user WHERE email = ?;'

//유저 추가
export const insertUserSql =
  "INSERT INTO user (username, email, level, profile, profile_img, point) VALUES (?, ?, 0, '', ?, 0);"

//유저 oauth정보 저장
export const insertOauthSql =
  'INSERT INTO oauthid(user_id, provider,kakao_id) VALUES(?,?,? );'

export const selectUser = `
    SELECT * FROM user WHERE id = ?`
