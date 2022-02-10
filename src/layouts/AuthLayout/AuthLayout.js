import React from 'react'
import PropTypes from 'prop-types'
import { AuthLayoutWrapper } from './AuthLayoutStyled'
import AuthHeader from '../../components/AuthHeader'
import AuthBody from '../../components/AuthBody'
import AuthFooter from '../../components/AuthFooter'

const AuthLayout = props => {
  const { children } = props
  return (
    <AuthLayoutWrapper>
      <AuthHeader />
      <AuthBody>
        {children}
      </AuthBody>
      <AuthFooter />
    </AuthLayoutWrapper>
  )
}

AuthLayout.propTypes = {}

export default AuthLayout