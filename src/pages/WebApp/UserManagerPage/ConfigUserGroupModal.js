import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'
import { DEVICE } from '../../../utils/constant'

const ConfigUserGroupModal = props => {
  const { user, visible, onClose, commonStore } = props
  const { device } = commonStore

  const [formConfigUserGroup] = Form.useForm()

  const onFinish = (formCollection) => {
    console.log(formCollection)
  }
  const handleCancel = () => {
    formConfigUserGroup.resetFields()
    onClose()
  }

  useEffect(() => {
    if (user) {
      //// Get detail User & Fill form
      // formConfigUserGroup.setFieldsValue({
      //
      // })
      formConfigUserGroup.setFieldsValue({
        Group: [1, 2],
      })
    }
  }, [user])

  return (
    <Modal
      title={`Phân nhóm người dùng ${user?.hoVaTen}`}
      style={{ top: 50 }}
      visible={visible}
      footer={null}
      onCancel={handleCancel}>
      <Form
        labelAlign={'left'}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={formConfigUserGroup}
        onFinish={onFinish}
        colon={false}>
        <Form.Item label={'Nhóm'} name={'Group'}>
          <Select
            mode={'multiple'}
            showSearch
            optionFilterProp={'name'}>
            <Select.Option value={1} name={'Nhóm 1'}>Nhóm 1</Select.Option>
            <Select.Option value={2} name={'Nhóm 2'}>Nhóm 2</Select.Option>
            <Select.Option value={3} name={'Nhóm 3'}>Nhóm 3</Select.Option>
            <Select.Option value={4} name={'Nhóm 4'}>Nhóm 4</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label={(device === DEVICE.MOBILE) ? null : ' '}>
          <Row justify={'start'} gutter={32}>
            <Col xxl={10} xl={10} lg={10} md={10} sm={10} xs={12}>
              <Button onClick={handleCancel} block>Hủy</Button>
            </Col>
            <Col xxl={10} xl={10} lg={10} md={10} sm={10} xs={12}>
              <Button block type={'primary'} htmlType={'submit'}>Lưu thông tin</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  )
}

ConfigUserGroupModal.propTypes = {
  user: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default inject('commonStore')(observer(ConfigUserGroupModal))