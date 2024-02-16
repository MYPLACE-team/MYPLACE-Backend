export const insertPlaceComplain = `
    INSERT INTO complain (user_id, place_id, content) VALUES (?, ?, ?);`

export const getComplain = `
    SELECT * FROM complain LIMIT ?, 10;
`
