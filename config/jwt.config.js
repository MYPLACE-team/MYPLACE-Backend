import dotenv from 'dotenv'
dotenv.config()

export const jwtConfig = {
  secretKey: process.env.TOKKEN_SECRET,
  options: {
    algorithm: process.env.TOKKEN_ALGORITHM,
    expiresIn: process.env.TOKKEN_EXPIRE,
  },
}
