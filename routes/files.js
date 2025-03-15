import express from 'express'

// File upload middleware
import multer from 'multer'

// Controllerss
import { uploadFile, getFiles, deleteFile } from '../controllers/files.js'

const router = express.Router()

const upload = multer( { storage: multer.memoryStorage() } )

router.route('/').get( getFiles ).post( upload.single('files'), uploadFile )

router.route('/:fileName').delete( deleteFile )

export default router