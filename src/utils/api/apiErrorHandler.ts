interface IError {
  status: number
}

const errorHandler = (error: IError) => {
  const errorObj = { payload: '' }
  if (error) {
    switch (error.status) {
      case 400:
        errorObj.payload = 'Bad Request'
        break
      case 401:
        errorObj.payload = 'Unauthorized'
        break
      case 403:
        errorObj.payload = 'Forbidden'
        break
      case 500:
        errorObj.payload = 'Internal Server Error'
        break
      default:
        errorObj.payload = 'Transaction Error'
    }
  }

  return errorObj
}

export default errorHandler
