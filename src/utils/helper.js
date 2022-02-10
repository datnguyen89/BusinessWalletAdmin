import stringUtils from './stringUtils'

const helper = {
  debounce: (delay, func) => {
    let timeout

    return function executedFunc(...args) {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        func(...args)
        timeout = null
      }, delay)
    }
  },
  formatStringRemoveCharMarkSpace: (e) => {
    let inputText = e.trim().replaceAll(' ', '')
    if (inputText?.length === 0) return
    inputText = stringUtils.removeVietnameseCharMark(inputText)
    return inputText
  },
}
export default helper