import React from 'react'
import PropTypes from 'prop-types'
import { MainBodyWrapper } from './MainBodyStyled'
import { DEVICE, SIDEBAR_WIDTH_COLLAPSE, SIDEBAR_WIDTH_EXPAND } from '../../utils/constant'
import { inject, observer } from 'mobx-react'
import LoadingOverLay from '../LoadingOverLay'

const MainBody = props => {
  const { children, commonStore } = props
  const { isCollapse, device } = commonStore

  const renderContentMargin = () => {
    if (device === DEVICE.MOBILE) return 0
    if (isCollapse) {
      return SIDEBAR_WIDTH_COLLAPSE
    } else {
      return SIDEBAR_WIDTH_EXPAND
    }
  }

  return (
    <MainBodyWrapper marginLeft={renderContentMargin}>
      {children}
      <LoadingOverLay />
    </MainBodyWrapper>

  )
}

MainBody.propTypes = {}
export default inject('commonStore')(observer(MainBody))
