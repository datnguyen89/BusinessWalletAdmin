/** Use only with Antd Form */
/** Use only with Antd Form */
/** Currently validator will no longer working if using regex from outside 'validator' object */
import moment from 'moment'

const validator = {

  validateCurrencyFormat: (rule, value, callback) => {
    const regex = /^[a-zA-Z]{3}/g
    if (value === '') {
      callback(`Should entered a value`)
    } else if (!regex.test(value)) {
      callback(`Incorrect currency format. E.g: 'USD', 'EUR'`)
    }
  },

  validateInputString: (rule, value, callback) => {
    const regex = /[!@#$%^*?"{}|<>]/g
    if (value && value.trim() === '') {
      callback(`Please do not leave this field blank.`)
    } else if (regex.test(value)) {
      callback(`Please do not enter special characters: ! @ # $ % ^ * ? " { } | < >`)
    } else {
      callback()
    }
  },

  validateInputStringFolderName: (rule, value, callback) => {
    const regex = /[!@#$%^&*`~]/g
    if (value && value.trim() === '') {
      callback(`Vui lòng nhập tên thư mục`)
    } else if (regex.test(value)) {
      callback(`Tên thư mục chứa ký tự !@#$%^^&*\`~ không hợp lệ`)
    } else {
      callback()
    }
  },

  validateWebsite: (rule, value, callback) => {
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
    if (value && !regex.test(value)) {
      callback('Incorrect website format!')
    } else {
      callback()
    }
  },

  validateEmail: (rule, value, callback) => {
    // const regex = /^[A-Za-z][A-Za-z0-9-_\.]{1,32}(\+?[0-9]){0,5}@[A-Za-z0-9_-]{2,}(\.[A-Za-z0-9]{2,4}){1,2}$/gm
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && !regex.test(value)) {
      callback('Email không đúng định dạng')
    } else {
      callback()
    }
  },

  validateAmountMoney: (rule, value, callback) => {
    if (value === undefined || value === null || value.length === 0) {
      callback('Vui lòng nhập số tiền cần chuyển')
    } else if (value <= 0) {
      callback('Số tiền chuyển phải lớn hơn 0')
    } else {
      callback()
    }
  },

  validateIntegerNumber: (rule, value, callback) => {
    if (value && !Number.isInteger(value)) {
      callback('Not an integer number')
    } else if (value && value < 0) {
      callback('Negative number not allowed')
    } else {
      callback()
    }
  },

  validateNumberFormat: (rule, value, callback) => {
    const regex = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/g
    if (value && value.trim() === '') {
      callback('Do not leave this field blank')
    } else if (isNaN(value) && value !== '' && value !== undefined) {
      callback(`Not a number`)
    } else if (value !== '' && value !== undefined && regex.test(value) === false) {
      callback(`Incorrect number format. Remove 0 from start, space or special characters`)
    } else if (value < 0) {
      callback(`Should be greater than 0`)
    } else {
      callback()
    }
  },


  validateVietnameseIdNumber: (rule, value, callback) => {
    const regex = /[0-9]{9,}/g
    if (value && !regex.test(value)) {
      callback('Số CMND không hợp lệ')
    } else {
      callback()
    }
  },
  validateNoteShare: (rule, value, callback) => {
    if (value && value.length > 200) {
      callback(profileStore?.appLanguage === 'en' ? 'Message length exceeds 200 characters' : 'Độ dài lời nhắn vượt quá 200 ký tự')
    } else {
      callback()
    }
  },
  validateLoginPassword: (rule, value, callback) => {
    const regex = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    let inputValue = value?.trim()
    if (!inputValue) {
      callback('Vui lòng nhập mật khẩu')
    } else if (inputValue.length < 8) {
      callback('Mật khẩu cần có độ dài tối thiểu 8 ký tự')
    } else if (!regex.test(inputValue)) {
      callback('Mật khẩu phải bao gồm chữ không dấu, số, ký tự đặc biệt')
    } else {
      callback()
    }
  },
  validatePhoneNumber: (rule, value, callback) => {
    // const regex = /(84|\+84|0[35789])+([0-9]{8,9})\b/g
    const regex = /(0[35789])+([0-9]{8})\b/g
    if (value && (!regex.test(value) || value.length > 12)) {
      callback('Số điện thoại không đúng định dạng')
    } else {
      callback()
    }
  },

  validatePassword: (rule, value, callback) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if (value && (!regex.test(value.trim()) || value.trim().length > 40)) {
      callback('Mật khẩu phải bao gồm chữ thường, viết hoa, chữ số, ký tự đặc biệt, tối thiểu 8 ký tự, tối đa 40 ký tự')
    } else {
      callback()
    }
  },
  validatePasswordShare: (rule, value, callback) => {
    if (value && (value.trim().length > 40)) {
      callback(profileStore?.appLanguage === 'en' ? 'Password can be up to 40 characters' : 'Mật khẩu có độ dài tối đa 40 ký tự')
    } else {
      callback()
    }
  },
  validatePasswordNew: (rule, value, callback) => {
    if (value && value.trim().length === 0) {
      callback(profileStore?.appLanguage === 'en' ? 'Please enter a password' : 'Vui lòng nhập mật khẩu')
    } else if (value && (value.trim().length > 18 || value.trim().length < 6)) {
      callback(profileStore?.appLanguage === 'en' ? 'Password can be up from 6 to 18 characters' : 'Mật khẩu có độ dài từ 6 đến 18 ký tự')
    } else {
      callback()
    }
  },
  validateSameOrBeforeDate: (rule, value, callback) => {
    if (utils.isNullish(value)) {
      callback()
      return
    }
    const currentDate = moment().format('YYYY-MM-DD')
    const compareDate = moment(value).format('YYYY-MM-DD')
    const check = moment(compareDate).isSameOrBefore(currentDate)
    if (!check) {
      callback('Should select the moment equal or before current moment!')
    } else {
      callback()
    }
  },

  validateSameOrAfterDate: (rule, value, callback) => {
    if (utils.isNullish(value)) {
      callback()
      return
    }
    const currentDate = moment().format('YYYY-MM-DD')
    const compareDate = moment(value).format('YYYY-MM-DD')
    const check = moment(compareDate).isSameOrAfter(currentDate)
    if (!check) {
      callback('Should select the moment equal or after current moment!')
    } else {
      callback()
    }
  },

}

export default validator
