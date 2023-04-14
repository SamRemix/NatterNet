const checkEmptyFields = (body: object) => {
  let emptyFields: string[] = []
  let message = ''

  Object.entries(body).map(([key, value]) => {
    if (!value) {
      emptyFields.push(key)
      message = 'You must fill all the fields'
    }
  })

  return { emptyFields, message }
}

export default checkEmptyFields