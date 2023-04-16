type ErrorProps = {
  message: string,
  emptyFields: string[]
}

const checkEmptyFields = (body: object) => {
  const error: ErrorProps = {
    message: '',
    emptyFields: []
  }

  if (typeof body !== 'object') {
    error.message = 'Parameter must be an object'
    error.emptyFields.push('error')

    return { error }
  }

  Object.entries(body).map(([key, value]) => {
    if (!value || value.trim().length === 0) {
      error.emptyFields.push(key)

      error.emptyFields.length === 1
        ? error.message = `You must fill in the "${key}" field`
        : error.message = 'You must fill all the fields'
    }
  })

  return { error }
}

export default checkEmptyFields