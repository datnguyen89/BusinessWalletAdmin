import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Modal, Row, Tree, TreeSelect } from 'antd'

const { SHOW_CHILD } = TreeSelect

const ConfigUserRoleModal = props => {
  const { userId, visible, onClose } = props

  const [formConfigUserRole] = Form.useForm()

  const onFinish = (formCollection) => {
    console.log(formCollection)
  }
  const handleCancel = () => {
    formConfigUserRole.resetFields()
    onClose()
  }

  const treeData = [
    {
      title: 'Tạo lập',
      value: '1',
      key: '1',
      children: [
        {
          title: 'Khởi tạo giao dịch',
          value: '2',
          key: '2',
          children: [
            {
              title: 'Trạng thái chờ duyệt',
              value: '3',
              key: '3',
            },
          ],
        },
        {
          title: 'Quản lý giao dịch tạo lập',
          value: '4',
          key: '4',
          children: [
            {
              title: 'Sửa',
              value: '5',
              key: '5',
            },
            {
              title: 'Xóa',
              value: '6',
              key: '6',
            },
          ],
        },
      ],
    },
    {
      title: 'Phê duyệt',
      value: '11',
      key: '11',
      children: [
        {
          title: 'Quản lý giao dịch',
          value: '22',
          key: '22',
          children: [
            {
              title: 'Phê duyệt',
              value: '33',
              key: '33',
            },
          ],
        },
      ],
    },
  ]

  useEffect(() => {
    if (userId > 0) {
      console.log(userId)
      //// Get detail User & Fill form
      // formConfigUserRole.setFieldsValue({
      //
      // })
      formConfigUserRole.setFieldsValue({
        roles: ['5', '6'],
      })
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
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={formConfigUserRole}
        onFinish={onFinish}
        colon={false}>
        <Form.Item label={'Phân quyền'} name={'roles'}>
          <TreeSelect
            autoClearSearchValue
            treeData={treeData}
            showSearch
            allowClear
            treeDefaultExpandAll
            treeCheckable
            showCheckedStrategy={'SHOW_CHILD'}
            treeNodeFilterProp={'title'}
          />
        </Form.Item>
        <Form.Item label={' '}>
          <Row justify={'start'} gutter={32}>
            <Col span={10}>
              <Button onClick={handleCancel} block>Hủy</Button>
            </Col>
            <Col span={10}>
              <Button block type={'primary'} htmlType={'submit'}>Lưu thông tin</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  )
}

ConfigUserRoleModal.propTypes = {
  userId: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ConfigUserRoleModal