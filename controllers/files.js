import asyncWrapper from '../middleware/asyncWrapper.js'

// Firebase
import firebase from '../firebase.js'
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage'


const storage = getStorage(firebase)

const uploadFile = asyncWrapper( async ( req, res ) => {
  try {
    if( !req.file ) {
      return res.status(400).send('No file uploaded.')
    }

    const uploadedFile = req.file

    console.log( { uploadedFile } )

    const storageReference = ref( storage, `pdfs/${ new Date().getTime() }_${ uploadedFile.originalname }` )

    const metadata = {
      contentType: uploadedFile.mimetype
    }

    const snapshot = await uploadBytesResumable( storageReference, uploadedFile.buffer, metadata )

    const downloadUrl = await getDownloadURL( snapshot.ref )

    res.status(200).json( {
      message: 'File uploaded successfully',
      filename: uploadedFile.originalname,
      type: uploadedFile.mimetype,
      downloadURL: downloadUrl
    } )
  } catch (error) {
    console.error(`Failed to upload files: ${error}`)
    res.status(500).json( { message: 'Server error: Failed to upload files' } )
  }
} )

export {
  uploadFile
}