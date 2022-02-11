import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { GroupManagerPageWrapper } from './GroupManagerPageStyled'
import DefaultLayout from '../../../layouts/DefaultLayout'
import { Helmet } from 'react-helmet/es/Helmet'
import {
  ColorTitle,
  PaginationLabel,
  RowFlexEndDiv,
  RowSpaceBetweenDiv,
} from '../../../components/CommonStyled/CommonStyled'
import { Button, Col, Divider, Form, Input, Pagination, Row, Select, Space, Table, Tooltip } from 'antd'
import { DEVICE } from '../../../utils/constant'
import { EditOutlined, FileProtectOutlined, SearchOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons'
import DetailGroupModal from './DetailGroupModal'
import ConfigGroupUserModal from './ConfigGroupUserModal'

const testData = [
  {
    id: 1,
    tenNhom: 'Nhóm A',
    loaiHeThong: 'Loại 1',
    moTa: 'mô tả hệ thống 1',
    nguoiTao: 'datnt',
    ngayTao: '02/11/2021',
  },
  {
    id: 2,
    tenNhom: 'Nhóm B',
    loaiHeThong: 'Loại 1',
    moTa: 'mô tả hệ thống 1',
    nguoiTao: 'datnt',
    ngayTao: '02/11/2021',
  },
  {
    id: 3,
    tenNhom: 'Nhóm C',
    loaiHeThong: 'Loại 1',
    moTa: 'mô tả hệ thống 1',
    nguoiTao: 'datnt',
    ngayTao: '02/11/2021',
  },
  {
    id: 4,
    tenNhom: 'Nhóm D',
    loaiHeThong: 'Loại 1',
    moTa: 'mô tả hệ thống 1',
    nguoiTao: 'datnt',
    ngayTao: '02/11/2021',
  },
  {
    id: 5,
    tenNhom: 'Nhóm A',
    loaiHeThong: 'Loại 1',
    moTa: 'mô tả hệ thống 1',
    nguoiTao: 'datnt',
    ngayTao: '02/11/2021',
  },
  {
    id: 6,
    tenNhom: 'Nhóm B',
    loaiHeThong: 'Loại 1',
    moTa: 'mô tả hệ thống 1',
    nguoiTao: 'datnt',
    ngayTao: '02/11/2021',
  },
  {
    id: 7,
    tenNhom: 'Nhóm C',
    loaiHeThong: 'Loại 1',
    moTa: 'mô tả hệ thống 1',
    nguoiTao: 'datnt',
    ngayTao: '02/11/2021',
  },
  {
    id: 8,
    tenNhom: 'Nhóm D',
    loaiHeThong: 'Loại 1',
    moTa: 'mô tả hệ thống 1',
    nguoiTao: 'datnt',
    ngayTao: '02/11/2021',
  },
]

const GroupManagerPage = props => {
  const { commonStore } = props
  const { device } = commonStore
  const [formApproveBusinessGroup] = Form.useForm()

  const [editInfoGroupId, setEditInfoGroupId] = useState(0)
  const [visibleDetailModal, setVisibleDetailModal] = useState(false)

  const [configUserGroupId, setConfigUserGroupId] = useState(0)
  const [configUserGroupName, setConfigUserGroupName] = useState('')
  const [visibleGroupModal, setVisibleGroupModal] = useState(false)

  const [configRoleGroupId, setConfigRoleGroupId] = useState(0)
  const [visibleRoleModal, setVisibleRoleModal] = useState(false)

  const columns = [
    {
      title: 'STT',
      width: 60,
      align: 'center',
      render: (item, row, index) => index + 1,
    },
    {
      title: 'Tên nhóm',
      render: (item, row, index) => item.tenNhom,
    },
    {
      title: 'Loại hệ thống',
      render: (item, row, index) => item.loaiHeThong,
    },
    {
      title: 'Mô tả',
      render: (item, row, index) => item.moTa,
    },
    {
      title: 'Người tạo',
      render: (item, row, index) => item.nguoiTao,
    },
    {
      title: 'Ngày tạo',
      render: (item, row, index) => item.ngayTao,
    },
    {
      align: 'center',
      title: 'Thao tác',
      render: (item, row, index) => (
        <Space size={16}>
          <Tooltip title={'Sửa thông tin nhóm'} mouseEnterDelay={0.3}>
            <EditOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowDetailGroupModal(item.id)} />
          </Tooltip>
          <Tooltip title={'Thêm người dùng vào nhóm'} mouseEnterDelay={0.3}>
            <TeamOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowGroupModal(item.id, item.tenNhom)} />
          </Tooltip>
          <Tooltip title={'Phân quyền nhóm'} mouseEnterDelay={0.3}>
            <FileProtectOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowRoleModal(item.id)} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const handleShowDetailGroupModal = (groupId) => {
    setEditInfoGroupId(groupId)
    setVisibleDetailModal(true)
  }
  const handleShowGroupModal = (groupId,groupName) => {
    setConfigUserGroupId(groupId)
    setConfigUserGroupName(groupName)
    setVisibleGroupModal(true)
  }
  const handleShowRoleModal = (groupId) => {
    setConfigRoleGroupId(groupId)
    setVisibleRoleModal(true)
  }

  const handleChangePagination = (pageIndex, pageSize) => {
    console.log(pageIndex, pageSize)
  }

  const handleCloseDetailGroupModal = () => {
    setVisibleDetailModal(false)
    setEditInfoGroupId(0)
  }
  const handleCloseConfigUserGroupModal = () => {
    setVisibleGroupModal(false)
    setConfigUserGroupId(0)
    setConfigUserGroupName('')
  }
  const handleCloseConfigGroupRoleModal = () => {
    setVisibleRoleModal(false)
    setConfigRoleGroupId(0)
  }

  return (
    <DefaultLayout>
      <Helmet>
        <title>Quản lý nhóm</title>
      </Helmet>
      <GroupManagerPageWrapper>
        <ColorTitle margin={'0 0 16px 0'}>Quản lý nhóm</ColorTitle>
        <Form
          labelAlign={'left'}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={formApproveBusinessGroup}
          colon={false}>
          <Row gutter={[32, 8]} justify={'center'}>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Tên nhóm'}
                name={'tenNhom'}>
                <Input maxLength={100} showCount={true} placeholder={'Nhập nội dung'} />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Loại hệ thống'}
                name={'loaiHeThong'}>
                <Select placeholder={'Chọn loại hệ thống'}>
                  <Select.Option value={'1'}>Loại hệ thống 1</Select.Option>
                  <Select.Option value={'2'}>Loại hệ thống 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Button
                style={{ minWidth: 120 }}
                block={device === DEVICE.MOBILE}
                type={'default'}>
                <SearchOutlined />
                Tra cứu nhóm
              </Button>
            </Col>
          </Row>
        </Form>
        <Divider />
        <RowFlexEndDiv margin={'0 0 24px 0'}>
          <Button
            block={device === DEVICE.MOBILE}
            onClick={() => handleShowDetailGroupModal(0)}
            type={'primary'}>
            <UserAddOutlined /> Thêm mới nhóm
          </Button>
        </RowFlexEndDiv>
        <Table
          bordered={true}
          scroll={{ x: 1400 }}
          dataSource={testData}
          columns={columns}
          rowKey={record => record.id}
          pagination={false} />
        <RowSpaceBetweenDiv margin={'16px 0'}>
          <PaginationLabel>
            Hiển thị từ 1 đến 10 trên tổng số 200 bản ghi
          </PaginationLabel>
          <Pagination defaultCurrent={1} total={500} onChange={handleChangePagination} />
        </RowSpaceBetweenDiv>

        <DetailGroupModal
          groupId={editInfoGroupId}
          visible={visibleDetailModal}
          onClose={handleCloseDetailGroupModal} />

        <ConfigGroupUserModal
          groupId={configUserGroupId}
          groupName={configUserGroupName}
          visible={visibleGroupModal}
          onClose={handleCloseConfigUserGroupModal} />

      </GroupManagerPageWrapper>
    </DefaultLayout>
  )
}

GroupManagerPage.propTypes = {}

export default inject('commonStore')(observer(GroupManagerPage))