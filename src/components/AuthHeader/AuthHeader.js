import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { AuthHeaderWrapper, SubTitleLogo } from './AuthHeaderStyled'
import IMAGES from '../../images'

const AuthHeader = props => {
  const { commonStore } = props
  return (
    <AuthHeaderWrapper>
      <img src={IMAGES.AUTH_LOGO} alt={''} height={66} width={86} />
      <SubTitleLogo color={commonStore.appTheme.solidColor}>CMS</SubTitleLogo>
    </AuthHeaderWrapper>
  )
}

AuthHeader.propTypes = {}

export default inject('commonStore')(observer(AuthHeader))