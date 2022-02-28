import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd'
import { APP_CLIENT_ID } from '../../../utils/constant'

const SetPasswordUserModal = props => {
  const { user, visible, onClose, userManagerStore } = props

  const [formConfigUser] = Form.useForm()

  const onFinish = (formCollection) => {
    let payload = {
      UserId: user.UserId,
      NewPassword: formCollection.password,
    }
    userManagerStore.resetPassword(payload)
      .then(res => {
        if (res?.responseCode === 0) {
          message.success(`Đặt lại mật khẩu cho người dùng ${user?.name || ''} thành công`)
          formConfigUser.resetFields()
          onClose()
        }
      })

  }
  const handleCancel = () => {
    formConfigUser.resetFields()
    onClose()
  }

  return (
    <Modal
      forceRender={true}
      title={`Đặt lại mật khẩu của người dùng ${user?.name || ''}`}
      style={{ top: 50 }}
      visible={visible}
      footer={null}
      onCancel={handleCancel}>
      <Form
        labelAlign={'left'}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={formConfigUser}
        onFinish={onFinish}
        colon={false}>
        <Form.Item
          label={'Mật khẩu'} name={'password'}
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu' },
            { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
          ]}>
          <Input.Password showCount maxLength={20} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item
          label={'Xác nhận mật khẩu'}
          name={'confirmPassword'}
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
          ]}>
          <Input.Password showCount maxLength={20} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Row justify={'center'} gutter={32}>
            <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={12}>
              <Button onClick={handleCancel} block>Hủy</Button>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={12}>
              <Button block type={'primary'} htmlType={'submit'}>Lưu thông tin</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  )
}

SetPasswordUserModal.propTypes = {
  user: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default inject('userManagerStore')(observer(SetPasswordUserModal))