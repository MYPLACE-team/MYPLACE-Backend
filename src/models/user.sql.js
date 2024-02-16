export const selectUsername = `
    SELECT username FROM user WHERE id = ?
    `

export const getUserById = `SELECT * FROM user WHERE id = ?`
export const getArchiveById = `SELECT * FROM archive WHERE user_id = ?`
export const getProviderById = `SELECT provider FROM oauthid WHERE user_id = ?`
export const CountPlaceById = `SELECT COUNT(*) cnt FROM user_place WHERE user_id = ?`
export const checkUsernameByname = `SELECT username FROM user WHERE username = ?`
export const selectUser = `
    SELECT * FROM user WHERE id = ?
    `

export const updateUserProfile = `UPDATE user SET username=?, profile=?, profile_img=? WHERE id = ?`
