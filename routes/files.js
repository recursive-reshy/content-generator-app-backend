import express from 'express'

// File upload middleware
import multer from 'multer'

// Controllerss
import { uploadFile } from '../controllers/files.js'

const router = express.Router()

const upload = multer( { storage: multer.memoryStorage() } )

router.route('/').post( upload.single('file'), uploadFile )

export default router