type ErrorProps = {
  message: string,
  invalidRegExps: string[]
}

const isStrongPassword = (password: string) => {
  const error: ErrorProps = {
    message: '',
    invalidRegExps: []
  }

  const regexps = [{
    regExp: /^.{8,}/,
    type: 'length',
    message: '8 characters'
  }, {
    regExp: /[A-Z]/,
    type: 'uppercase',
    message: '1 uppercase character'
  }, {
    regExp: /[a-z]/,
    type: 'lowercase',
    message: '1 lowercase character'
  }, {
    regExp: /\d/,
    type: 'number',
    message: '1 number'
  }, {
    regExp: /[^a-zA-Z\d]/,
    type: 'special',
    message: '1 special character'
  }]

  regexps.map(({ regExp, type, message }) => {
    if (!password.match(regExp)) {
      error.invalidRegExps.push(type)

      error.invalidRegExps.length === 1
        ? error.message = `Your password must contain at least ${message}`
        : error.message = 'Your password isn\'t strong enough'
    }
  })

  return { passwordError: error }
}

export default isStrongPassword