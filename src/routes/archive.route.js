import express from 'express'
import {
  addArchiveController,
  removeArchiveController,
  editArchiveController,
  showArchiveDetailController,
  showArchiveController,
} from '../controllers/archive.controller'
export const archiveRouter = express.Router({ mergeParams: true })

archiveRouter.post('/', addArchiveController)
archiveRouter.get('/search', showArchiveController)
archiveRouter.delete('/:archiveId', removeArchiveController)
archiveRouter.put('/:archiveId', editArchiveController)
archiveRouter.get('/:archiveId', showArchiveDetailController)
