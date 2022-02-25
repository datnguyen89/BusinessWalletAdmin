import React, { useEffect } from 'react'
import { Button, Col, Form, Input, message, Row, Select, Tag } from 'antd'
import { ColorText } from '../../../components/CommonStyled/CommonStyled'
import validator from '../../../validator'
import { inject, observer } from 'mobx-react'
import AuthLayout from '../../../layouts/AuthLayout'
import { PAGES } from '../../../utils/constant'

const RegisterPage = props => {
  const { onClose, userManagerStore, appSettingStore } = props

  const { listClients } = appSettingStore

  const [formConfigUser] = Form.useForm()

  const onFinish = (formCollection) => {
    userManagerStore.registerUser(formCollection)
      .then(res => {
        if (!res.error) {
          formConfigUser.resetFields()
          onClose()
          message.success('Đăng ký thành công')
          history.push(PAGES.LOGIN.PATH)
        } else {
          message.error(res?.message)
        }
      })
  }
  const handleCancel = () => {
    formConfigUser.resetFields()
    onClose()
  }


  useEffect(() => {
    appSettingStore.getClients()
  }, [])
  return (
    <AuthLayout>
      <Form
        labelAlign={'left'}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={formConfigUser}
        onFinish={onFinish}
        colon={false}>
        <Form.Item
          label={'Hệ thống'} name={'ClientIds'}
          rules={[{ required: true, message: 'Vui lòng chọn hệ thống' }]}>
          <Select
            mode={'multiple'}
            placeholder={'Chọn hệ thống'}>
            {
              listClients.map(item =>
                <Select.Option key={item.clientId} value={item.clientId}>{item.name}</Select.Option>,
              )
            }
          </Select>
        </Form.Item>
        <Form.Item
          label={'Tên đăng nhập'} name={'UserName'}
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
          <Input showCount maxLength={20} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item
          label={'Mật khẩu'} name={'Password'}
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
          <Input.Password showCount maxLength={20} placeholder={'Nhập nội dung'} />
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
          <Input.Password showCount maxLength={20} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item
          label={'Họ và tên'}
          name={'FullName'}
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
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

        <Form.Item wrapperCol={{ span: 24 }}>
          <Row justify={'center'} gutter={32}>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
              <Button onClick={handleCancel} block>Hủy</Button>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
              <Button block type={'primary'} htmlType={'submit'}>Lưu thông tin</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </AuthLayout>
  )
}

RegisterPage.propTypes = {}

export default inject('userManagerStore', 'commonStore', 'appSettingStore')(observer(RegisterPage))