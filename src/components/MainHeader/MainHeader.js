import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faExchangeAlt,
  faFileInvoiceDollar,
  faHandHoldingUsd,
  faLink,
  faList,
} from '@fortawesome/free-solid-svg-icons'
import { HeaderLogoArea, MainHeaderRight, MainHeaderRightMobile, MainHeaderWrapper } from './MainHeaderStyled'
import IMAGES from '../../images'
import { Drawer, Menu } from 'antd'
import HeaderUserArea from '../HeaderUserArea'
import { Link, useHistory } from 'react-router-dom'
import { DEVICE, PAGES, SIDEBAR_WIDTH_EXPAND } from '../../utils/constant'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import MenuSideBarArea from '../MenuSideBarArea'

const MainHeader = props => {
  const { commonStore } = props
  const { appTheme } = commonStore
  const { pageName } = props.commonStore
  const [visibleMobileDrawerLeft, setVisibleMobileDrawerLeft] = useState(false)
  const [visibleMobileDrawerRight, setVisibleMobileDrawerRight] = useState(false)
  const { device } = commonStore
  const history = useHistory()

  const handleClickDrawerMenu = (e) => {
    console.log('handleClickDrawerMenu', e)
  }

  const handleToggleSideBar = () => {
    commonStore.setIsCollapse(!commonStore.isCollapse)
  }
  return (
    <MainHeaderWrapper gradientColor={appTheme.gradientColor}>
      <HeaderLogoArea width={device === DEVICE.DESKTOP ? commonStore.isCollapse ? 'auto' : '220px' : 'auto'}>
        <img src={IMAGES.AUTH_LOGO} alt={''} style={{ cursor: 'pointer' }} height={48}
             onClick={() => history.push(PAGES.HOME.PATH)} />
        {
          device === DEVICE.DESKTOP
            ?
            commonStore.isCollapse
              ?
              <MenuUnfoldOutlined onClick={handleToggleSideBar} />
              :
              <MenuFoldOutlined onClick={handleToggleSideBar} />
            : null
        }
      </HeaderLogoArea>
      <MainHeaderRight>
        {/*<HeaderNotifyArea>*/}
        {/*  <NotifyBell />*/}
        {/*</HeaderNotifyArea>*/}
        <HeaderUserArea />
      </MainHeaderRight>

      <MainHeaderRightMobile>
        <FontAwesomeIcon
          onClick={() => setVisibleMobileDrawerRight(true)}
          icon={faBars}
          size={'2x'}
          color={'#fff'}
          style={{ cursor: 'pointer' }} />
        <Drawer
          title={<Link style={{ color: appTheme.solidColor }} to={'/'}>CMS Ví doanh nghiệp</Link>}
          placement='right'
          style={{ padding: 0 }}
          onClose={() => setVisibleMobileDrawerRight(false)}
          visible={visibleMobileDrawerRight}>
          <MenuSideBarArea />
        </Drawer>
      </MainHeaderRightMobile>
    </MainHeaderWrapper>

  )
}

MainHeader.propTypes = {}

export default inject('commonStore')(observer(MainHeader))