import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Modal, Row, Tree, TreeSelect } from 'antd'
import { DEVICE } from '../../../utils/constant'
import { inject, observer } from 'mobx-react'

const ConfigRoleGroupModal = props => {
  const { group, visible, onClose, commonStore } = props
  const { device } = commonStore
  const [formConfigGroupRole] = Form.useForm()

  const onFinish = (formCollection) => {
    console.log(formCollection)
  }
  const handleCancel = () => {
    formConfigGroupRole.resetFields()
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


  const [checkedKeys, setCheckedKeys] = useState(['33'])

  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue)
    setCheckedKeys(checkedKeysValue)
  }

  useEffect(() => {
    console.log(group)

    if (group) {
      //// Get detail Group & Fill form
      // formConfigGroupRole.setFieldsValue({
      //
      // })
      formConfigGroupRole.setFieldsValue({
        roles: ['5', '6'],
      })
    }
  }, [group])

  return (
    <Modal
      title={`Phân quyền nhóm ${group?.tenNhom}`}
      style={{ top: 50 }}
      visible={visible}
      footer={null}
      onCancel={handleCancel}>
      <Form
        labelAlign={'left'}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        form={formConfigGroupRole}
        onFinish={onFinish}
        colon={false}>
        <Form.Item label={'Phân quyền'} name={'roles'}>
          <Tree
            selectable={false}
            defaultExpandAll={true}
            checkable
            onCheck={onCheck}
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

ConfigRoleGroupModal.propTypes = {
  group: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default inject('commonStore')(observer(ConfigRoleGroupModal))
