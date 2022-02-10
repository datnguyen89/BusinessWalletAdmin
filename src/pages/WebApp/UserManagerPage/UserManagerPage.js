import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { UserManagerPageWrapper } from './UserManagerPageStyled'
import DefaultLayout from '../../../layouts/DefaultLayout'
import { Helmet } from 'react-helmet/es/Helmet'
import { ColorTitle } from '../../../components/CommonStyled/CommonStyled'
import { Form } from 'antd'

const UserManagerPage = props => {
  const { authenticationStore } = props

  const onFinish = (formCollection) => {

  }

  return (
    <DefaultLayout>
      <Helmet>
        <title>Quản lý người dùng</title>
      </Helmet>
      <UserManagerPageWrapper>
        <ColorTitle>
          Quản lý User
        </ColorTitle>
        <Form onFinish={onFinish}>
          <Form.Item label={'user'}>

          </Form.Item>
        </Form>
      </UserManagerPageWrapper>
    </DefaultLayout>
  )
}

UserManagerPage.propTypes = {}

export default inject('authenticationStore')(observer(UserManagerPage))
