import express from 'express'
import {
  addArchiveController,
  removeArchiveController,
  editArchiveController,
} from '../controllers/archive.controller'
export const archiveRouter = express.Router({ mergeParams: true })

archiveRouter.post('/', addArchiveController)
archiveRouter.delete('/:archiveId', removeArchiveController)
archiveRouter.put('/:archiveId', editArchiveController)
