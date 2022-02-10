import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons'
import {
  BusinessName, FooterRightMenu, FooterRightMenuItem, FooterRightPhone,
  MainFooterLeft,
  MainFooterLeftInfo,
  MainFooterRight,
  MainFooterWrapper,
  TelsArea,
} from './MainFooterStyled'
import IMAGES from '../../images'
import { Link } from 'react-router-dom'
import { PAGES } from '../../utils/constant'

const MainFooter = props => {
  const { commonStore } = props
  const { appTheme } = commonStore
  return (
    <MainFooterWrapper solidColor={appTheme.solidColor}>
      <MainFooterLeft>
        <Link to={'#'}>
          <img src={IMAGES.AUTH_LOGO} alt={''} height={48} />
        </Link>
        <MainFooterLeftInfo>
          <BusinessName color={appTheme.solidColor}>Tổng công ty Viễn Thông MobiFone </BusinessName>
          <p>Số 01 phố Phạm Văn Bạch, Yên Hòa, Cầu Giấy, Hà Nội</p>
          <TelsArea>
            <a href={'tel:84243781800'}>
              (+84-24) 3783 1800
            </a>
            <span style={{ margin: '0 8px' }}>-</span>
            <a href={'tel:842437831734'}>
              (+84-24) 3783 1734
            </a>
          </TelsArea>
        </MainFooterLeftInfo>
      </MainFooterLeft>
      <MainFooterRight>

        <FooterRightPhone>
          <a href={'tel:18001090'}>
            <FontAwesomeIcon icon={faPhoneVolume} style={{ marginRight: 8 }} />
            18001090
          </a>
        </FooterRightPhone>
      </MainFooterRight>
    </MainFooterWrapper>
  )
}

MainFooter.propTypes = {}

export default inject('commonStore')(observer(MainFooter))