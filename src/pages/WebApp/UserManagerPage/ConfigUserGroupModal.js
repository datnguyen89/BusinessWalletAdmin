import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Select } from 'antd'
import { DEVICE } from '../../../utils/constant'
import { toJS } from 'mobx'

const ConfigUserGroupModal = props => {
  const { user, visible, onClose, commonStore, groupManagerStore } = props
  const { device } = commonStore
  const { listGroupIdByUser, listGroups } = groupManagerStore

  const [formConfigUserGroup] = Form.useForm()

  const onFinish = (formCollection) => {
    console.log(formCollection)
    let payload = {
      UserId: user?.userId,
      GroupIds: formCollection.Groups
    }
    groupManagerStore.updateGroupForUser(payload)
      .then(res => {
        if (res?.responseCode === 0) {
          onClose()
          formConfigUserGroup.resetFields()
          message.success(`Phân nhóm cho người dùng ${user?.name || ''} thành công`)
        }
      })

  }
  const handleCancel = () => {
    formConfigUserGroup.resetFields()
    onClose()
  }

  useEffect(() => {
    if (!user) return
    groupManagerStore.getGroupByUser({ UserId: user.userId })
  }, [user])

  useEffect(() => {
    groupManagerStore.getListGroups()
  }, [])

  useEffect(() => {
    formConfigUserGroup.setFieldsValue({
      Groups: listGroupIdByUser,
    })
  }, [listGroupIdByUser])

  return (
    <Modal
      forceRender={true}
      title={`Phân nhóm người dùng ${user?.name || ''}`}
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
        <Form.Item label={'Nhóm'} name={'Groups'}>
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              {
                listGroups && listGroups.map(item =>
                  <Col key={item.groupId} xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Checkbox value={item.groupId}>{item.name}</Checkbox>
                  </Col>,
                )
              }
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label={null} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
          <Row justify={'center'} gutter={32}>
            <Col xxl={8} xl={8} lg={8} md={10} sm={10} xs={12}>
              <Button onClick={handleCancel} block>Hủy</Button>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={10} sm={10} xs={12}>
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

export default inject('commonStore', 'groupManagerStore',
)
(observer(ConfigUserGroupModal))