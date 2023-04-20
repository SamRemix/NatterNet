const toastAnimation = {
  initial: {
    // y: 100,
    opacity: 0,
    scale: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1
  },
  exit: {
    x: 100,
    opacity: 0
  },
  transition: {
    duration: .3
  }
}

export default toastAnimation