import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'
import validator from '../../../validator'
import { CLIENTS } from '../../../utils/constant'

const DetailUserModal = props => {
  const { user, visible, onClose, userManagerStore } = props

  const [formConfigUser] = Form.useForm()

  const onFinish = (formCollection) => {
    console.log(formCollection)
    if (user?.id > 0) {

    } else {
      userManagerStore.registerUser(formCollection)
        .then(res => {
          console.log(res)
        })
    }
  }
  const handleCancel = () => {
    formConfigUser.resetFields()
    onClose()
  }

  const renderClientOptions = () => {
    let val = []
    for (const [key, value] of Object.entries(CLIENTS)) {
      val.push(<Select.Option key={key} value={value.ID}>{value.NAME}</Select.Option>)
    }
    return val
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
      title={user?.id > 0 ? `Sửa thông tin người dùng ${user?.hoVaTen}` : 'Thêm mới người dùng'}
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
        <Form.Item label={'Hệ thống'} name={'ClientIds'}>
          <Select mode={'multiple'} placeholder={'Chọn hệ thống'}>
            {
              renderClientOptions()
            }
          </Select>
        </Form.Item>
        <Form.Item label={'Họ và tên'} name={'FullName'}>
          <Input showCount maxLength={100} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item label={'Số điện thoại'} name={'PhoneNumber'}
                   rules={[{ validator: validator.validatePhoneNumber }]}>
          <Input showCount maxLength={20} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item label={'Email'} name={'Email'}
                   rules={[{ validator: validator.validateEmail }]}>
          <Input showCount maxLength={100} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item label={'UserName'} name={'UserName'}>
          <Input showCount maxLength={20} placeholder={'Nhập nội dung'} />
        </Form.Item>
        {
          !user &&
          <>
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
          </>
        }
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