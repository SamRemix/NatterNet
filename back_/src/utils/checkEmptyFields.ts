const checkEmptyFields = (body: object) => {
  let emptyFields: string[] = []
  let message = ''

  if (typeof body !== 'object') {
    emptyFields.push('error')
    message = 'Parameter must be an object'

    return { emptyFields, message }
  }

  Object.entries(body).map(([key, value]) => {
    if (!value || value.trim().length === 0) {
      emptyFields.push(key)
      message = 'You must fill all the fields'
    }
  })

  return { emptyFields, message }
}

export default checkEmptyFields