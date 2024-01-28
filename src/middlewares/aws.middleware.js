import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import dotenv from 'dotenv'
import path from 'path'
import { v4 as uuid } from 'uuid'
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
      const uploadDirectory = req.query.directory ?? 'profile' // 업로드할 디렉토리를 설정하기 위해 넣어둔 코드로, 없어도 무관합니다.
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

export const middleUpload = async (req, res) => {
  const filePath = req.file
  if (!filePath) {
    console.log('err')
  }
  console.log(filePath)
  res.send(filePath)
}
export const middleMultipleUpload = async (req, res) => {
  const filePath = req.files
  if (!filePath) {
    console.log('err')
  }
  console.log(filePath)
  res.send(filePath)
}
