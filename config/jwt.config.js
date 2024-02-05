import dotenv from 'dotenv'
dotenv.config()

export const jwtConfig = {
  secretKey: process.env.TOKEN_SECRET,
  options: {
    algorithm: process.env.TOKEN_ALGORITHM,
    expiresIn: process.env.TOKEN_EXPIRE,
  },
}
export const jwtRefreshConfig = {
  secretKey: process.env.TOKEN_SECRET,
  options: {
    algorithm: process.env.TOKEN_ALGORITHM,
    expiresIn: process.env.TOKEN_REFRESH_EXPIRE,
  },
}
