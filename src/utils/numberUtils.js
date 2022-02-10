const numberUtils = {
  /** Add commas for separate thousand in number */
  thousandSeparator: num => {
    return num && num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  },
}

export default numberUtils
