import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, message, Modal, Row, Select, Tag } from 'antd'
import { ColorText } from '../../../components/CommonStyled/CommonStyled'
import { toJS } from 'mobx'

const DetailGroupModal = props => {
  const { group, visible, onClose, appSettingStore, groupManagerStore, commonStore } = props

  const { clientTypes } = appSettingStore
  const { resetFilterObj, selectingGroup } = groupManagerStore

  const [formConfigGroup] = Form.useForm()

  const onFinish = (formCollection) => {
    console.log(formCollection)
    if (!group) {
      let payload = {
        ClientType: formCollection.ClientType,
        Name: formCollection.Name,
        Description: formCollection.Description ? formCollection.Description : '',
      }
      groupManagerStore.addGroup(payload)
        .then(res => {
          if (!res.error) {
            onClose()
            formConfigGroup.resetFields()
            message.success('Thêm mới nhóm thành công')
            groupManagerStore.setFilterObj(resetFilterObj)
            commonStore.setAppLoading(true)
            groupManagerStore.getListGroupsPaging()
              .finally(() => commonStore.setAppLoading(false))
          }
        })
    } else {
      let payload = {
        GroupId: group?.groupId,
        ClientType: selectingGroup?.clientType,
        Name: formCollection.Name,
        Description: formCollection.Description,
      }
      groupManagerStore.updateGroup(payload)
        .then(res => {
          if (!res.error) {
            onClose()
            formConfigGroup.resetFields()
            message.success('Cập nhật nhóm thành công')
            groupManagerStore.setFilterObj(resetFilterObj)
            commonStore.setAppLoading(true)
            groupManagerStore.getListGroupsPaging()
              .finally(() => commonStore.setAppLoading(false))
          }
        })
    }
  }
  const handleCancel = () => {
    formConfigGroup.resetFields()
    onClose()
  }

  useEffect(() => {
    if (!group) return
    groupManagerStore.getGroupById({ GroupId: group.groupId })
      .then(res => {
        formConfigGroup.setFieldsValue({
          Name: res.name,
          Description: res.description,
        })
      })
  }, [group])

  useEffect(() => {
    console.log(toJS(selectingGroup))
  }, [selectingGroup])

  return (
    <Modal
      style={{ top: 50 }}
      title={group ? `Sửa thông tin nhóm ${group?.name}` : 'Thêm mới nhóm'}
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
        {
          group
            ?
            <Form.Item label={'Loại hệ thống'}>
              <Tag>{selectingGroup?.clientType}</Tag>
            </Form.Item>
            :
            <Form.Item
              label={'Loại hệ thống'} name={'ClientType'}
            >
              <Select placeholder={'Chọn loại hệ thống'} allowClear>
                {
                  clientTypes && clientTypes.map(item =>
                    <Select.Option key={item} value={item}>{item}</Select.Option>,
                  )
                }
              </Select>
            </Form.Item>
        }

        <Form.Item label={'Tên nhóm'} name={'Name'}>
          <Input showCount maxLength={20} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item label={'Mô tả'} name={'Description'}>
          <Input.TextArea rows={3} showCount maxLength={100} placeholder={'Nhập nội dung'} />
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
  group: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default inject('appSettingStore', 'groupManagerStore', 'commonStore')(observer(DetailGroupModal))