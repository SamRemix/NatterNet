type ErrorProps = {
  message: string,
  emptyFields: string[]
}

const checkEmptyFields = (body: object) => {
  const error: ErrorProps = {
    message: '',
    emptyFields: []
  }

  Object.entries(body).map(([key, value]) => {
    if (!value || value.trim().length === 0) {
      error.emptyFields.push(key)

      error.emptyFields.length === 1
        ? error.message = `You must fill in the "${key}" field`
        : error.message = 'You must fill all the fields'
    }
  })

  const isEmptyField = (field: string) => (
    error.emptyFields.includes(field)
  )

  return { emptyFieldsError: error, isEmptyField }
}

export default checkEmptyFields