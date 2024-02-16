import express from 'express'
import {
  addArchiveFolderController,
  addArchiveController,
  removeArchiveController,
  editArchiveController,
  showArchiveDetailController,
  showArchiveUserController,
  showArchiveListController,
} from '../controllers/archive.controller'
export const archiveRouter = express.Router({ mergeParams: true })

archiveRouter.get('/', showArchiveUserController)


archiveRouter.post('/', addArchiveController)

archiveRouter.get('/search', showArchiveListController)
archiveRouter.post('/folder', addArchiveFolderController)

archiveRouter.get('/:archiveId', showArchiveDetailController)
archiveRouter.put('/:archiveId', editArchiveController)
archiveRouter.delete('/:archiveId', removeArchiveController)
