import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Divider, Form, Input, Modal, Row, Space, Tag, Tree, TreeSelect } from 'antd'
import { DEVICE } from '../../../utils/constant'
import { inject, observer } from 'mobx-react'

const ConfigUserRoleModal = props => {
  const { user, visible, onClose, commonStore } = props
  const { device } = commonStore
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
              disabled: true,
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
    {
      title: 'Tạo lập',
      value: '10',
      key: '10',
      children: [
        {
          title: 'Khởi tạo giao dịch',
          value: '20',
          key: '20',
          children: [
            {
              title: 'Trạng thái chờ duyệt',
              value: '30',
              key: '30',
            },
          ],
        },
        {
          title: 'Quản lý giao dịch tạo lập',
          value: '40',
          key: '40',
          children: [
            {
              title: 'Sửa',
              value: '50',
              key: '50',
            },
            {
              title: 'Xóa',
              value: '60',
              key: '60',
            },
          ],
        },
      ],
    },
    {
      title: 'Phê duyệt',
      value: '110',
      key: '110',
      children: [
        {
          title: 'Quản lý giao dịch',
          value: '220',
          key: '220',
          children: [
            {
              title: 'Phê duyệt',
              value: '330',
              key: '330',
            },
          ],
        },
      ],
    },
    {
      title: 'Tạo lập',
      value: '100',
      key: '100',
      children: [
        {
          title: 'Khởi tạo giao dịch',
          value: '200',
          key: '200',
          children: [
            {
              title: 'Trạng thái chờ duyệt',
              value: '300',
              key: '300',
            },
          ],
        },
        {
          title: 'Quản lý giao dịch tạo lập',
          value: '400',
          key: '400',
          children: [
            {
              title: 'Sửa',
              value: '500',
              key: '500',
            },
            {
              title: 'Xóa',
              value: '600',
              key: '600',
            },
          ],
        },
      ],
    },
    {
      title: 'Phê duyệt',
      value: '1100',
      key: '1100',
      children: [
        {
          title: 'Quản lý giao dịch',
          value: '2200',
          key: '2200',
          children: [
            {
              title: 'Phê duyệt',
              value: '3300',
              key: '3300',
            },
          ],
        },
      ],
    },
  ]

  const [selectedKeys, setSelectedKeys] = useState(['500', '600'])
  const [checkedKeys, setCheckedKeys] = useState(['3300', '5'])

  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue)
    setCheckedKeys(checkedKeysValue)
  }
  const onSelect = (selectedKeys) => {
    console.log(selectedKeys)
  }

  useEffect(() => {
    console.log(user)
    if (user) {
      //// Get detail User & Fill form
      // formConfigUserRole.setFieldsValue({
      //
      // })
      formConfigUserRole.setFieldsValue({})
    }
  }, [user])

  return (
    <Modal
      title={`Phân quyền người dùng ${user?.hoVaTen}`}
      style={{ top: 50 }}
      visible={visible}
      footer={null}
      onCancel={handleCancel}>
      <Space>
        <Button onClick={() => setSelectedKeys(['5', '6'])}>Nhóm 1</Button>
        <Button onClick={() => setSelectedKeys(['50', '60'])}>Nhóm 2</Button>
        <Button onClick={() => setSelectedKeys(['500', '600'])}>Nhóm 3</Button>
      </Space>
      <Divider />
      <Form
        labelAlign={'left'}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        form={formConfigUserRole}
        onFinish={onFinish}
        colon={false}>
        <Form.Item
          label={'Phân quyền'}>
          <Tree
            multiple
            selectedKeys={selectedKeys}
            selectable={true}
            defaultExpandAll={true}
            checkable
            onCheck={onCheck}
            onSelect={onSelect}
            checkedKeys={checkedKeys}
            treeData={treeData}
          />
        </Form.Item>
        <Form.Item label={''}>
          <Row justify={'center'} gutter={32}>
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

ConfigUserRoleModal.propTypes = {
  user: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default inject('commonStore')(observer(ConfigUserRoleModal))
