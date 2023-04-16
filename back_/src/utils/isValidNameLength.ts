const isValidNameLength = (name: string, min: number, max: number) => {
  let error = ''

  if (name.trim().length < min) {
    error = `Your name must contain at least ${min} characters`
  }

  if (name.trim().length > max) {
    error = `Your name must not exceed ${max} characters`
  }

  return { nameLengthError: error }
}

export default isValidNameLength