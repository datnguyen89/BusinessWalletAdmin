import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Modal, Row } from 'antd'

const DetailUserModal = props => {
  const { userId, visible, onClose } = props

  const [formInsertUser] = Form.useForm()

  const onFinish = (formCollection) => {
    console.log(formCollection)
  }
  const handleCancel = () => {
    formInsertUser.resetFields()
    onClose()
  }

  useEffect(() => {
    if (userId > 0) {
      console.log(userId)
      //// Get detail User & Fill form
      // formInsertUser.setFieldsValue({
      //
      // })
    }
  }, [userId])

  return (
    <Modal
      title={userId > 0 ? 'Sửa thông tin User' : 'Thêm mới User'}
      visible={visible}
      footer={null}
      onCancel={handleCancel}>
      <Form
        labelAlign={'left'}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={formInsertUser}
        onFinish={onFinish}
        colon={false}>
        <Form.Item label={'Họ và tên'} name={'FullName'}>
          <Input showCount maxLength={100} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item label={'Số điện thoại'} name={'PhoneNumber'}>
          <Input showCount maxLength={20} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item label={'Email'} name={'Email'}>
          <Input showCount maxLength={100} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item label={'UserName'} name={'UserName'}>
          <Input showCount maxLength={20} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item label={'Mật khẩu'} name={'Password'}>
          <Input showCount maxLength={20} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: 'Vui lòng nhập lại mật khẩu mới' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('Password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Mật khẩu xác nhận không trùng khớp'))
              },
            }),
          ]}
          label={'Xác nhận mật khẩu'}
          name={'ConfirmPassword'}>
          <Input showCount maxLength={20} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Row justify={'center'} gutter={32}>
            <Col span={8}>
              <Button onClick={handleCancel} block>Hủy</Button>
            </Col>
            <Col span={8}>
              <Button block type={'primary'} htmlType={'submit'}>Lưu thông tin</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  )
}

DetailUserModal.propTypes = {
  userId: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default DetailUserModal