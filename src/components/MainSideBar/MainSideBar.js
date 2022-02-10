import React from 'react'
import { inject, observer } from 'mobx-react'
import { DEVICE, SIDEBAR_WIDTH_COLLAPSE, SIDEBAR_WIDTH_EXPAND } from '../../utils/constant'
import { MainSideBarWrapper } from './MainSideBarStyled'
import MenuSideBarArea from '../MenuSideBarArea'

const MainSideBar = props => {
  const { commonStore } = props
  const { isCollapse, device } = commonStore

  return (
    <MainSideBarWrapper
      display={device === DEVICE.MOBILE ? 'none' : 'flex'}
      width={isCollapse ? SIDEBAR_WIDTH_COLLAPSE : SIDEBAR_WIDTH_EXPAND}>
      <MenuSideBarArea />
    </MainSideBarWrapper>
  )
}

MainSideBar.propTypes = {}

export default inject('commonStore')(observer(MainSideBar))