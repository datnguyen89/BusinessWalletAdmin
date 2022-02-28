import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, message, Modal, Row, Tree, TreeSelect } from 'antd'
import { APP_CLIENT_ID, DEVICE, ROLE_TYPES } from '../../../utils/constant'
import { inject, observer } from 'mobx-react'


const ConfigRoleGroupModal = props => {
  const { group, visible, onClose, commonStore, groupManagerStore } = props
  const { device } = commonStore
  const { treeRolesForGroup } = groupManagerStore
  const [formConfigGroupRole] = Form.useForm()

  const onFinish = (formCollection) => {
    let realRoleIds = checkedKeys.filter(item => isNaN(item) && !ROLE_TYPES.includes(item))
    let payload = {
      GroupId: group?.groupId,
      Roles: realRoleIds,
    }
    groupManagerStore.updateRoleGroup(payload)
      .then(res => {
        if (res?.responseCode === 0) {
          message.success(`Phân quyền nhóm ${group?.name} thành công`)
          formConfigGroupRole.resetFields()
          setCheckedKeys([])
          onClose()
        }
      })
  }
  const handleCancel = () => {
    formConfigGroupRole.resetFields()
    setCheckedKeys([])
    onClose()
  }


  const [checkedKeys, setCheckedKeys] = useState([])

  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue)
    setCheckedKeys(checkedKeysValue)
  }

  useEffect(() => {
    if (!group) return
    let payload = {
      ClientId: APP_CLIENT_ID,
      GroupId: group.groupId,
    }
    groupManagerStore.getTreeRolesForGroup(payload)
      .then(res => {
        setCheckedKeys(res?.data?.roleIdsForTree || [])
      })
  }, [group])

  return (
    <Modal
      forceRender={true}
      title={`Phân quyền nhóm ${group?.name}`}
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
        <Form.Item label={'Phân quyền'}>
          {
            treeRolesForGroup && treeRolesForGroup?.length > 0 &&
            <Tree
              selectable={false}
              defaultExpandAll={true}
              checkable
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              treeData={treeRolesForGroup}
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

ConfigRoleGroupModal.propTypes = {
  group: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default inject('commonStore', 'groupManagerStore')(observer(ConfigRoleGroupModal))
