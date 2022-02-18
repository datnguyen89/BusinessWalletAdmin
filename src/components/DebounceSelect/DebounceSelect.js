import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import { DEBOUNCE_DELAY } from '../../utils/constant'

const DebounceSelect = ({ initOption, fetchOptions, debounceTimeout = DEBOUNCE_DELAY, ...props }) => {
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const fetchRef = React.useRef(0)
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return
        }
        console.log(newOptions)
        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  useEffect(() => {
    if (!initOption || initOption?.length === 0) return
    setOptions(initOption)
  },[initOption])

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
      options={options}
    />
  )
}

DebounceSelect.propTypes = {}

export default DebounceSelect