import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'

const DetailGroupModal = props => {
  const { groupId, visible, onClose } = props

  const [formConfigGroup] = Form.useForm()

  const onFinish = (formCollection) => {
    console.log(formCollection)
  }
  const handleCancel = () => {
    formConfigGroup.resetFields()
    onClose()
  }

  useEffect(() => {
    if (groupId > 0) {
      console.log(groupId)
      //// Get detail Group & Fill form
      // formConfigGroup.setFieldsValue({
      //
      // })
    }
  }, [groupId])

  return (
    <Modal
      title={groupId > 0 ? 'Sửa thông tin nhóm' : 'Thêm mới nhóm'}
      visible={visible}
      footer={null}
      onCancel={handleCancel}>
      <Form
        labelAlign={'left'}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={formConfigGroup}
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
        <Form.Item label={'GroupName'} name={'GroupName'}>
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

DetailGroupModal.propTypes = {
  groupId: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default DetailGroupModal