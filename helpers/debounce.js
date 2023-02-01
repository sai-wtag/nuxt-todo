const debounce = (func, delay) => {
  let timeout
  return function executed() {
    const later = () => {
      timeout = null
      func.apply(this, arguments)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, delay)
  }
}

export default debounce
