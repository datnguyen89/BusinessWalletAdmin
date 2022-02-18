import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Divider, Form, Input, message, Modal, Row, Space, Tag, Tree, TreeSelect } from 'antd'
import { APP_CLIENT_ID, DEVICE, ROLE_TYPES } from '../../../utils/constant'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

const ConfigUserRoleModal = props => {
  const { user, visible, onClose, commonStore, userManagerStore } = props
  const { device } = commonStore
  const { treeRoles } = userManagerStore
  const [formConfigUserRole] = Form.useForm()

  const [selectedKeys, setSelectedKeys] = useState([])
  const [checkedKeys, setCheckedKeys] = useState([])

  const onFinish = (formCollection) => {
    let realRoleIds = checkedKeys.filter(item => isNaN(item) && !ROLE_TYPES.includes(item))
    let payload = {
      UserId: user?.userId,
      Roles: realRoleIds,
    }
    userManagerStore.updateRoleUser(payload)
      .then(res => {
        if (!res.error) {
          message.success(`Phân quyền người dùng ${user?.name} thành công`)
          formConfigUserRole.resetFields()
          setCheckedKeys([])
          onClose()
        }
      })
  }
  const handleCancel = () => {
    formConfigUserRole.resetFields()
    onClose()
  }


  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue)
    setCheckedKeys(checkedKeysValue)
  }
  const onSelect = (selectedKeys) => {
    console.log(selectedKeys)
  }

  useEffect(() => {
    if (!user) return
    let payload = {
      ClientId: APP_CLIENT_ID,
      UserId: user.userId,
    }
    userManagerStore.getTreeRoles(payload)
      .then(res => {
        setCheckedKeys(res?.data?.roleIdsForTree || [])
      })
    userManagerStore.getRoleGroupByUser({ UserId: user.userId })
      .then(res => {
        console.log(res)
      })
  }, [user])

  useEffect(() => {
    console.log(toJS(treeRoles))
  }, [treeRoles])


  return (
    <Modal
      forceRender={true}
      title={`Phân quyền người dùng ${user?.name || ''}`}
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
          {
            treeRoles && treeRoles.length > 0 &&
            <Tree
              multiple
              selectedKeys={selectedKeys}
              selectable={true}
              defaultExpandAll={true}
              checkable
              onCheck={onCheck}
              onSelect={onSelect}
              checkedKeys={checkedKeys}
              treeData={treeRoles}
            />
          }

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

export default inject('commonStore', 'userManagerStore')(observer(ConfigUserRoleModal))
