import asyncWrapper from '../middleware/asyncWrapper.js'
import { OpenAI } from 'openai'

const postMessage = asyncWrapper( async ( req, res ) => {
  try {
    const { message } = req.body

    const apiKey = req.headers.authorization?.replace('Bearer ', '') // Extract API key from header

    if ( !apiKey ) {
      return res.status(401).json( { error: 'Unauthorized: API key required' } )
    }

    const openai = new OpenAI( { apiKey } )

    if( !message ) {
      return res.status(400).json( { message: 'Prompt is required' } )
    }

    const { choices } = await openai.chat.completions.create( {
      model: 'gpt-4o-mini',
      messages: [
          { role: 'user', content: message },
      ],
      store: true,
    } )

    res.json( { response: choices[0].message.content } )
  } catch (error) {
    console.error(`Failed to generate response: ${error}`)
    res.status(500).json( { message: 'Server error: Failed to generate response' } )
  }
} )

export {
  postMessage
}