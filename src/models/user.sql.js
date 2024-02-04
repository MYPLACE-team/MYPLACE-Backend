export const selectUsername = `
    SELECT username FROM user WHERE id = ?
    `

export const getUserById = `SELECT * FROM user WHERE id = ?`
export const getArchiveById = `SELECT * FROM archive WHERE user_id = ?`
export const CountPlaceById = `SELECT COUNT(*) cnt FROM user_place WHERE user_id = ?`
