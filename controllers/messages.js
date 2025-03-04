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

    const response = await openai.completions.create( {
      model: 'gpt-4',
      prompt,
      max_tokens: 200,
    } )

    res.json( { text: response.choices[0]?.text.trim() || 'No response' } )
  } catch (error) {
    console.error(`Failed to generate response: ${error}`)
    res.status(500).json( { message: 'Server error: Failed to generate response' } )
  }
} )

export {
  postMessage
}