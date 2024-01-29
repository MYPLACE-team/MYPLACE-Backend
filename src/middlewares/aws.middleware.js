import { pool } from '../../config/db.config'
import { BaseError } from '../../config/error'
import { status } from '../../config/response.status'
import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import dotenv from 'dotenv'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { response } from '../../config/response'
dotenv.config()

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
})

const s3 = new AWS.S3()

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp']

export const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME, // 생성한 버킷 이름을 적어주세요.
    key: (req, file, callback) => {
      const uploadDirectory = req.params.directory ?? 'dummy' // 업로드할 디렉토리를 설정하기 위해 넣어둔 코드로, 없어도 무관합니다.
      const extension = path.extname(file.originalname)
      if (!allowedExtensions.includes(extension)) {
        // extension 확인을 위한 코드로, 없어도 무관합니다.
        return callback(new Error('wrong extension'))
      }
      callback(null, `${uploadDirectory}/${uuid()}${extension}`)
    },
    acl: 'public-read-write',
  }),
})

//단일 파일 업로드
export const profileUpload = async (req, res) => {
  let conn
  const { userId, location } = req.body
  try {
    conn = await pool.getConnection()
    await conn.beginTransaction()
    await conn.query('UPDATE user SET profile_img=? WHERE id = ?;', [
      req.file.location,
      userId,
    ])
    await s3.deleteObject(
      {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `profile/${location.split('profile/')[1]}`,
      },
      (err) => {
        if (err) throw err
      },
    )
    await conn.commit()
    conn.release()
  } catch (err) {
    console.log('ADDUSER: ', err)

    try {
      if (conn) {
        await conn.rollback()
      }
    } catch (rollbackError) {
      console.error('Error in rollback:', rollbackError)
    }

    throw new BaseError(status.PARAMETER_IS_WRONG)
  }
  const filePath = req.file
  if (!filePath) {
    console.log('err')
  }
  console.log(filePath)
  res.send(response(status.SUCCESS, req.file.location))
}

//여러 사진 업로드 (3개 제한을 프론트에서 한다고 가정.)
export const middleMultipleUpload = async (req, res) => {
  const result = []
  const { directory, archiveId } = req.params
  console.log(directory, archiveId)
  req.files.forEach((file) => {
    result.push(file.location)
  })
  let conn
  try {
    conn = await pool.getConnection()
    await conn.beginTransaction()
    await req.files.forEach((file) => {
      if (directory == 'archive')
        conn.query('INSERT INTO archive_img(archive_id, url) VALUES(?,? );', [
          archiveId,
          file.location,
        ])
    })
    //await conn.query(insertOauthSql, [result[0].insertId, oauthId, provider])
    await conn.commit()
    conn.release()
  } catch (err) {
    console.log('ADDUSER: ', err)

    try {
      if (conn) {
        await conn.rollback()
      }
    } catch (rollbackError) {
      console.error('Error in rollback:', rollbackError)
    }

    throw new BaseError(status.PARAMETER_IS_WRONG)
  }

  const filePath = req.files
  if (!filePath) {
    console.log('err')
  }
  res.send(response(status.SUCCESS, result))
}
