import express from 'express'

import { postMessage } from '../controllers/messages.js'

const router = express.Router()

router.route('/').post(postMessage)

export default router