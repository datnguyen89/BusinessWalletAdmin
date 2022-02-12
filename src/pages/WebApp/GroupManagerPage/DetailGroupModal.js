import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'

const DetailGroupModal = props => {
  const { group, visible, onClose } = props

  const [formConfigGroup] = Form.useForm()

  const onFinish = (formCollection) => {
    console.log(formCollection)
  }
  const handleCancel = () => {
    formConfigGroup.resetFields()
    onClose()
  }

  useEffect(() => {
    console.log(group)

    if (group) {
      //// Get detail Group & Fill form
      // formConfigGroup.setFieldsValue({
      //
      // })
    }
  }, [group])

  return (
    <Modal
      style={{ top: 50 }}
      title={group ? `Sửa thông tin nhóm ${group?.tenNhom}` : 'Thêm mới nhóm'}
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
        <Form.Item label={'Loại hệ thống'} name={'ClientIds'}>
          <Select mode={'multiple'} placeholder={'Chọn loại hệ thống'}>
            <Select.Option value={'1'}>Loại 1</Select.Option>
            <Select.Option value={'2'}>Loại 2</Select.Option>
            <Select.Option value={'3'}>Loại 3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={'Tên nhóm'} name={'tenNhom'}>
          <Input showCount maxLength={20} placeholder={'Nhập nội dung'} />
        </Form.Item>
        <Form.Item label={'Mô tả'} name={'Mô tả'}>
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

export default DetailGroupModal