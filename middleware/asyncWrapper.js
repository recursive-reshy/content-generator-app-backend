const asyncWrapper = callback => {
  return async ( req, response, next ) => {
    try {
      await callback( req, response, next )
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
}

export default asyncWrapper