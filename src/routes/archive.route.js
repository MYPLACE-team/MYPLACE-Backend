import express from 'express'
import {
  addArchiveFolderController,
  addArchiveController,
  removeArchiveController,
  editArchiveController,
  showArchiveDetailController,
  showArchiveUserController,
} from '../controllers/archive.controller'
export const archiveRouter = express.Router({ mergeParams: true })

archiveRouter.post('/', addArchiveController)
archiveRouter.get('/', showArchiveUserController)
archiveRouter.delete('/:archiveId', removeArchiveController)
archiveRouter.put('/:archiveId', editArchiveController)
archiveRouter.get('/:archiveId', showArchiveDetailController)
archiveRouter.post('/folder', addArchiveFolderController)
