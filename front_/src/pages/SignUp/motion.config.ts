const signUpAnimation = {
  nameInput: {
    initial: {
      x: -100,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .4
      }
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: .2,
        delay: .3
      }
    }
  },
  emailInput: {
    initial: {
      x: -100,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .4,
        delay: .1
      }
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: .2,
        delay: .2
      }
    }
  },
  passwordInput: {
    initial: {
      x: -100,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .4,
        delay: .2
      }
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: .2,
        delay: .1
      }
    }
  },
  submitButton: {
    initial: {
      x: -100,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .4,
        delay: .3
      }
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: .2
      }
    }
  },
}

export default signUpAnimation