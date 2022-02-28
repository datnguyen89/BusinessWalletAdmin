import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, message, Modal, Row, Select, Tag } from 'antd'
import validator from '../../../validator'
import { ColorText } from '../../../components/CommonStyled/CommonStyled'

const DetailUserModal = props => {
  const { user, visible, onClose, userManagerStore, commonStore, appSettingStore } = props

  const { listStatusUser, listClients } = appSettingStore
  const { resetFilterObj, selectingUser } = userManagerStore

  const [formConfigUser] = Form.useForm()

  const onFinish = (formCollection) => {
    if (user?.UserId) {
      userManagerStore.updateInfoUser({ ...formCollection, UserId: user?.UserId })
        .then(res => {
          if (res?.responseCode === 0) {
            formConfigUser.resetFields()
            onClose()
            message.success('Cập nhật người dùng thành công')
            userManagerStore.setFilterObj(resetFilterObj)
            userManagerStore.getListUsers()
          }
        })
    } else {
      userManagerStore.registerUser(formCollection)
        .then(res => {
          if (res?.responseCode === 0) {
            formConfigUser.resetFields()
            onClose()
            message.success('Thêm mới người dùng thành công')
            userManagerStore.setFilterObj(resetFilterObj)
            userManagerStore.getListUsers()
          }
        })
    }
  }
  const handleCancel = () => {
    formConfigUser.resetFields()
    onClose()
  }

  useEffect(() => {
    if (user?.UserId) {
      userManagerStore.getUserById({ UserId: user.UserId })
        .then(res => {
          if (res?.responseCode === 0) {
            let param = JSON.parse(res?.param)
            formConfigUser.setFieldsValue({
              ClientIds: param?.ClientIds,
              UserName: param.UserName,
              FullName: param?.Name,
              PhoneNumber: param?.PhoneNumber,
              Email: param?.Email,
              ActiveStatus: param?.ActiveStatus,
            })
          }
        })
    }
  }, [user])
  useEffect(() => {
    appSettingStore.getClients()
  }, [])

  return (
    <Modal
      forceRender={true}
      title={user?.UserId ? `Sửa thông tin người dùng ${user?.name || ''}` : 'Thêm mới người dùng'}
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
        {
          !user?.UserId
            ?
            <Form.Item
              label={'Hệ thống'} name={'ClientIds'}
              rules={[{ required: true, message: 'Vui lòng chọn hệ thống' }]}>
              <Select
                disabled={user?.UserId}
                mode={'multiple'}
                placeholder={'Chọn hệ thống'}>
                {
                  listClients.map(item =>
                    <Select.Option key={item.clientId} value={item.clientId}>{item.name}</Select.Option>,
                  )
                }
              </Select>
            </Form.Item>
            :
            <Form.Item
              label={'Hệ thống'}>
              {
                selectingUser && listClients.filter(item => selectingUser?.ClientIds.includes(item.clientId)).map(item =>
                  <Tag key={item.clientId}>{item.name}</Tag>,
                )
              }
            </Form.Item>
        }
        {
          !user?.UserId
            ?
            <Form.Item
              label={'Tên đăng nhập'} name={'UserName'}
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
              <Input disabled={user?.UserId} showCount maxLength={20} placeholder={'Nhập nội dung'} />
            </Form.Item>
            :
            <Form.Item
              label={'Tên đăng nhập'}>
              <ColorText>{selectingUser?.UserName}</ColorText>
            </Form.Item>
        }
        {
          !user?.UserId &&
          <>
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
          </>
        }
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
        {
          user?.UserId &&
          <Form.Item
            label={'Trạng thái'} name={'ActiveStatus'}
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
            <Select placeholder={'Chọn trạng thái'} allowClear>
              {
                listStatusUser && listStatusUser.map(item =>
                  <Select.Option key={item.status} value={item.status}>{item.description}</Select.Option>,
                )
              }
            </Select>
          </Form.Item>
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

export default inject('userManagerStore', 'commonStore', 'appSettingStore')(observer(DetailUserModal))