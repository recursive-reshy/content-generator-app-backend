import express from 'express'
import cors from 'cors'

// App config
const app = express()
const PORT = process.env.PORT || 5000

app.use( cors() )
app.use( express.json() )

app.get( '/', ( req, res ) => res.send('Health check') )

app.listen( PORT, () => console.log(`Server running on port ${PORT}`) )