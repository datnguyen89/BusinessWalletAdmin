import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import AuthLayout from '../../../layouts/AuthLayout'
import { Button, Checkbox, Col, Divider, Form, Input, message, Row } from 'antd'
import { FormLoginWrapper, LoginDescription, LoginPageWrapper, LoginTitle } from './LoginPageStyled'
import { Link, useHistory } from 'react-router-dom'
import * as forge from 'node-forge'
import { APP_CLIENT_ID, PAGES, PUBLIC_KEY } from '../../../utils/constant'
import stringUtils from '../../../utils/stringUtils'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ColorLink } from '../../../components/CommonStyled/CommonStyled'
import helper from '../../../utils/helper'
import validator from '../../../validator'

const LoginPage = props => {
  const { commonStore, authenticationStore } = props
  const history = useHistory()
  const [formLogin] = Form.useForm()

  const onFinish = (collectionForm) => {
    console.log(collectionForm)
    authenticationStore.userLogin(collectionForm)
      .then(res => {
        if (!res.error) {
          history.push(PAGES.HOME.PATH)
        }
      })
  }

  useEffect(() => {
    formLogin.setFieldsValue({ ClientId: APP_CLIENT_ID })
  }, [])

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
            <Form.Item hidden={true} label={'ClientId'} name={'ClientId'}>
              <Input />
            </Form.Item>
            <Form.Item
              label={'Tên đăng nhập'}
              name={'UserName'}
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
            >
              <Input prefix={<UserOutlined />} placeholder={'Tên đăng nhập'} />
            </Form.Item>
            <Form.Item
              label={'Mật khẩu'}
              name={'Password'}
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder={'Mật khẩu'} />
            </Form.Item>
            <Row>
              <Col span={24}>
                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                  <ColorLink color={commonStore.appTheme.solidColor} to={PAGES.REGISTER.PATH}>Đăng ký tài khoản</ColorLink>
                </Form.Item>
              </Col>
              {/*<Col span={12}>*/}
              {/*  <Form.Item wrapperCol={{ offset: 0, span: 24 }} style={{ textAlign: 'right' }}>*/}
              {/*    <ColorLink color={commonStore.appTheme.solidColor} to={'#'}>Quên mật khẩu ?</ColorLink>*/}
              {/*  </Form.Item>*/}
              {/*</Col>*/}
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