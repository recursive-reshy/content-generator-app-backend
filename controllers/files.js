import asyncWrapper from '../middleware/asyncWrapper.js'

// Firebase
import firebase from '../firebase.js'
import { getStorage, ref, getDownloadURL, uploadBytesResumable, listAll, deleteObject } from 'firebase/storage'


const storage = getStorage(firebase)

const uploadFile = asyncWrapper( async ( req, res ) => {
  try {
    if( !req.file ) {
      return res.status(400).send('No file uploaded.')
    }

    const uploadedFile = req.file

    const storageReference = ref( storage, `${ process.env.UPLOAD_PATH }/${ new Date().getTime() }_${ uploadedFile.originalname }` )

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

const getFiles = asyncWrapper( async ( req, res ) => {
  try {
    // Create a reference under which you want to list
    const listRef = ref( storage, process.env.UPLOAD_PATH )

    // Find all the prefixes and items.
    const { items } = await listAll(listRef)
    
    const transformedData = await Promise.all( items.map( async ( { name } ) => ( 
      { name,
        originalName: name.split('_')[1],
        downloadURL: await getDownloadURL( ref( storage, `${ process.env.UPLOAD_PATH }/${ name }` ) )
      } 
    ) ) )

    res.status(200).json( { files: transformedData } )
  } catch (error) {
    console.error(`Failed to get files: ${error}`)
    res.status(500).json( { message: 'Server error: Failed to get files' } )
  }
} )

const deleteFile = asyncWrapper( async ( req, res ) => {
  try {
    const { fileName } = req.params
    
    await deleteObject( ref( storage, `${ process.env.UPLOAD_PATH }/${ fileName }` ) )
    res.status(200).json( { message: 'File deleted successfully' } )
  } catch (error) {
    console.error(`Failed to delete file: ${error}`)
    res.status(500).json( { message: 'Server error: Failed to delete file' } )
  }
} )

export {
  uploadFile,
  getFiles,
  deleteFile
}