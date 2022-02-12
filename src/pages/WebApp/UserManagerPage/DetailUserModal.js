import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'

const DetailUserModal = props => {
  const { user, visible, onClose, userManagerStore } = props

  const [formConfigUser] = Form.useForm()

  const onFinish = (formCollection) => {
    console.log(formCollection)
    if (user?.id > 0) {

    } else {
      userManagerStore.registerUser(formCollection)
    }
  }
  const handleCancel = () => {
    formConfigUser.resetFields()
    onClose()
  }

  useEffect(() => {
    console.log(user)
    if (user) {
      //// Get detail User & Fill form
      // formConfigUser.setFieldsValue({
      //
      // })
    }
  }, [user])

  return (
    <Modal
      title={user?.id > 0 ? `Sửa thông tin người dùng ${user.hoVaTen}` : 'Thêm mới người dùng'}
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
        <Form.Item label={'Hệ thống'} name={'ClientIds'}>
          <Select mode={'multiple'} placeholder={'Chọn hệ thống'}>
            <Select.Option value={'1'}>ADMIN</Select.Option>
            <Select.Option value={'2'}>CMS</Select.Option>
            <Select.Option value={'3'}>CUSTOMER</Select.Option>
          </Select>
        </Form.Item>
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
          label={'Xác nhận mật khẩu'}
          name={'ConfirmPassword'}
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
          ]}>
          <Input showCount maxLength={20} placeholder={'Nhập nội dung'} />
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

DetailUserModal.propTypes = {
  user: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default inject('userManagerStore')(observer(DetailUserModal))