import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import AuthLayout from '../../../layouts/AuthLayout'
import { Button, Checkbox, Col, Divider, Form, Input, message, Row } from 'antd'
import { FormLoginWrapper, LoginDescription, LoginPageWrapper, LoginTitle } from './LoginPageStyled'
import { Link, useHistory } from 'react-router-dom'
import * as forge from 'node-forge'
import { PUBLIC_KEY } from '../../../utils/constant'
import stringUtils from '../../../utils/stringUtils'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ColorLink } from '../../../components/CommonStyled/CommonStyled'
import helper from '../../../utils/helper'

const LoginPage = props => {
  const { commonStore, authenticationStore } = props
  const history = useHistory()
  const [formLogin] = Form.useForm()

  const onFinish = (collectionForm) => {
    console.log(collectionForm)
    history.push('/')
  }

  return (
    <AuthLayout>
      <LoginPageWrapper>
        <LoginTitle color={commonStore.appTheme.solidColor}>Administrator</LoginTitle>
        <LoginDescription>Đăng nhập quản lý hệ thống</LoginDescription>
        <FormLoginWrapper>
          <Form form={formLogin}
                onFinish={onFinish}
                size={'large'}
                colon={false}
                labelAlign={'left'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}>
            <Form.Item label={'Tên đăng nhập'} name={'username'}>
              <Input prefix={<UserOutlined />} placeholder={'Tên đăng nhập'} />
            </Form.Item>
            <Form.Item label={'Mật khẩu'} name={'password'}>
              <Input.Password prefix={<LockOutlined />} placeholder={'Mật khẩu'} />
            </Form.Item>
            <Divider />
            <Row>
              <Col span={12}>
                <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 0, span: 24 }}>
                  <Checkbox>Lưu thông tin</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item wrapperCol={{ offset: 0, span: 24 }} style={{ textAlign: 'right' }}>
                  <ColorLink color={commonStore.appTheme.solidColor} to={'#'}>Quên mật khẩu ?</ColorLink>
                </Form.Item>
              </Col>
            </Row>
            <Button block type={'primary'} htmlType={'submit'}>Đăng nhập</Button>
          </Form>
        </FormLoginWrapper>

      </LoginPageWrapper>
    </AuthLayout>
  )
}

LoginPage.propTypes = {}

export default inject('commonStore', 'authenticationStore')(observer(LoginPage))