import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { ChangePasswordModalWrapper } from './ChangePasswordModalStyled'
import { Button, Col, Form, Input, message, Row } from 'antd'
import OtpModal from '../OtpModal'
import SuccessModal from '../SuccessModal'

const ChangePasswordModal = props => {
  const { onClose, onSuccess, visible } = props
  const [formChangePassword] = Form.useForm()

  const [visibleOtp, setVisibleOtp] = useState(false)
  const [visibleSuccess, setVisibleSuccess] = useState(false)

  const handleCancel = () => {
    onClose()
    formChangePassword.resetFields()
  }
  const onFinishChangePassword = (formCollection) => {
    console.log('Success:', formCollection)
    // TODO: handle submit new password then close modal change password
    onClose()
    // TODO: show modal OTP
    setVisibleOtp(true)
  }
  const onFinishFailedChangePassword = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const handleCallbackOtp = (otp) => {
    console.log(otp)
    setVisibleOtp(false)
    setVisibleSuccess(true)
  }

  const handleSuccessChangePassword = () => {
    setVisibleSuccess(false)
    onSuccess()
  }

  useEffect(() => {
    formChangePassword.resetFields()
  }, [visible])

  return (
    <>
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
          onFinishFailed={onFinishFailedChangePassword}
          autoComplete='off'
          colon={false}
        >
          <Form.Item
            label=''
            name='oldPassword'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
          >
            <Input.Password size={'large'} className={'auth-input'} placeholder={'Mật khẩu hiện tại'} />
          </Form.Item>
          <Form.Item
            label=''
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
          >
            <Input.Password size={'large'} className={'auth-input'} placeholder={'Mật khẩu mới'} />
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
            <Input.Password size={'large'} className={'auth-input'} placeholder={'Xác nhận mật khẩu mới'} />
          </Form.Item>
          <Form.Item>
            <span>
              * Vui lòng đặt mật khẩu gồm cả số và chữ, tối thiểu 8 ký tự và chứa ký tự đặc biệt
            </span>
          </Form.Item>
          <Row align={'middle'} justify={'center'}>
            <Col span={11}>
              <Button type='primary' htmlType='submit' size={'large'} block>
                Tiếp theo
              </Button>
            </Col>
          </Row>
        </Form>
      </ChangePasswordModalWrapper>
      <OtpModal
        visible={visibleOtp}
        callbackOtp={handleCallbackOtp}
        onCancel={() => setVisibleOtp(false)}
        phoneNumber={'0379631004'} />
      <SuccessModal visible={visibleSuccess} description={'Đối mật khẩu thành công'}
                    callbackSuccess={handleSuccessChangePassword} />
    </>

  )
}

ChangePasswordModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ChangePasswordModal