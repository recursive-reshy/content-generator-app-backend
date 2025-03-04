import express from 'express'
import cors from 'cors'

import messages from './routes/messages.js'

// App config
const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use( cors() )
app.use( express.json() )

// Routes
app.use( `/api/v${process.env.VERSION}/messages`, messages )

app.get( '/', ( req, res ) => res.send('Health check') )

app.listen( PORT, () => console.log(`Server running on port ${PORT}`) )