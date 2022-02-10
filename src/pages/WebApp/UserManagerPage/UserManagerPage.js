import React from 'react'
import PropTypes from 'prop-types'
import { UserManagerPageWrapper } from './UserManagerPageStyled'
import DefaultLayout from '../../../layouts/DefaultLayout'
import { Helmet } from 'react-helmet/es/Helmet'

const UserManagerPage = props => {
  return (
    <DefaultLayout>
      <Helmet>
        <title>Quản lý người dùng</title>
      </Helmet>
      <UserManagerPageWrapper>
        Quan ly nguoi dung
      </UserManagerPageWrapper>
    </DefaultLayout>
  )
}

UserManagerPage.propTypes = {

}

export default UserManagerPage