import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { ChangePasswordModalWrapper } from './ChangePasswordModalStyled'
import { Button, Col, Form, Input, message, Row } from 'antd'
import OtpModal from '../OtpModal'
import SuccessModal from '../SuccessModal'

const ChangePasswordModal = props => {
  const { onClose, visible, authenticationStore } = props
  const [formChangePassword] = Form.useForm()
  const { jwtDecode } = authenticationStore


  const handleCancel = () => {
    onClose()
    formChangePassword.resetFields()
  }
  const onFinishChangePassword = (formCollection) => {
    console.log(formCollection)
    let payload = {
      UserId: jwtDecode.sub,
      OldPassword: formCollection.oldPassword,
      NewPassword: formCollection.password,
    }
    authenticationStore.changePassword(payload)
      .then(res => {
        if (!res.error) {
          formChangePassword.resetFields()
          onClose()
          message.success('Đổi mật khẩu thành công')
        } else {
          message.error(res?.message)
        }
      })

  }

  return (

    <ChangePasswordModalWrapper
      width={550}
      title='Đổi mật khẩu'
      forceRender={true}
      maskClosable={false}
      visible={visible}
      footer={null}
      onCancel={handleCancel}>
      <Form
        form={formChangePassword}
        name='basic'
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinishChangePassword}
        autoComplete='off'
        colon={false}
      >
        <Form.Item
          label=''
          name='oldPassword'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
        >
          <Input.Password className={'auth-input'} placeholder={'Mật khẩu hiện tại'} />
        </Form.Item>
        <Form.Item
          label=''
          name='password'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
        >
          <Input.Password className={'auth-input'} placeholder={'Mật khẩu mới'} />
        </Form.Item>
        <Form.Item
          label=''
          dependencies={['password']}
          name='confirmPassword'
          rules={[
            { required: true, message: 'Vui lòng nhập lại mật khẩu mới' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Mật khẩu xác nhận không trùng khớp'))
              },
            }),
          ]}
        >
          <Input.Password className={'auth-input'} placeholder={'Xác nhận mật khẩu mới'} />
        </Form.Item>
        <Form.Item>
            <span>
              * Vui lòng đặt mật khẩu gồm cả số và chữ, tối thiểu 8 ký tự và chứa ký tự đặc biệt
            </span>
        </Form.Item>
        <Row align={'middle'} justify={'center'}>
          <Col span={11}>
            <Button type='primary' htmlType='submit' block>
              Tiếp theo
            </Button>
          </Col>
        </Row>
      </Form>
    </ChangePasswordModalWrapper>


  )
}

ChangePasswordModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default inject('authenticationStore')(observer(ChangePasswordModal))