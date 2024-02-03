import express from 'express'
import { addArchiveController } from '../controllers/archive.controller'
export const archiveRouter = express.Router({ mergeParams: true })

archiveRouter.post('/', addArchiveController)
