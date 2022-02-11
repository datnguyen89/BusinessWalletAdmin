import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { UserManagerPageWrapper } from './UserManagerPageStyled'
import DefaultLayout from '../../../layouts/DefaultLayout'
import { Helmet } from 'react-helmet/es/Helmet'
import {
  ColorTitle,
  PaginationLabel,
  RowFlexEndDiv,
  RowSpaceBetweenDiv,
} from '../../../components/CommonStyled/CommonStyled'
import { Button, Col, DatePicker, Divider, Form, Input, Pagination, Row, Select, Space, Table, Tooltip } from 'antd'
import { EditOutlined, FileProtectOutlined, SearchOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons'
import { DEVICE } from '../../../utils/constant'
import DetailUserModal from './DetailUserModal'
import ConfigUserGroupModal from './ConfigUserGroupModal'
import ConfigUserRoleModal from './ConfigUserRoleModal'

const { RangePicker } = DatePicker

const testData = [
  {
    id: 1,
    hoVaTen: 'Nguyễn Văn A',
    soDienThoai: '0987654123',
    email: 'user@gmail.com',
    UserName: 'username1',
    ngayTao: '20/01/2022',
    nguoiTao: 'hant',
    trangThai: 'Hoạt động',
  },
  {
    id: 2,
    hoVaTen: 'Nguyễn Văn B',
    soDienThoai: '0987654123',
    email: 'user@gmail.com',
    UserName: 'username1',
    vaiTro: 'Tạo lập',
    noiDung: 'Thêm mới',
    ngayTao: '20/01/2022',
    nguoiTao: 'hant',
    trangThai: 'Hoạt động',
  },
  {
    id: 3,
    hoVaTen: 'Nguyễn Văn C',
    soDienThoai: '0987654123',
    email: 'user@gmail.com',
    UserName: 'username1',
    vaiTro: 'Tạo lập',
    noiDung: 'Thêm mới',
    ngayTao: '20/01/2022',
    nguoiTao: 'hant',
    trangThai: 'Hoạt động',
  },
  {
    id: 4,
    hoVaTen: 'Nguyễn Văn D',
    soDienThoai: '0987654123',
    email: 'user@gmail.com',
    UserName: 'username1',
    vaiTro: 'Tạo lập',
    noiDung: 'Thêm mới',
    ngayTao: '20/01/2022',
    nguoiTao: 'hant',
    trangThai: 'Hoạt động',
  },
  {
    id: 5,
    hoVaTen: 'Nguyễn Văn A',
    soDienThoai: '0987654123',
    email: 'user@gmail.com',
    UserName: 'username1',
    ngayTao: '20/01/2022',
    nguoiTao: 'hant',
    trangThai: 'Hoạt động',
  },
  {
    id: 6,
    hoVaTen: 'Nguyễn Văn B',
    soDienThoai: '0987654123',
    email: 'user@gmail.com',
    UserName: 'username1',
    vaiTro: 'Tạo lập',
    noiDung: 'Thêm mới',
    ngayTao: '20/01/2022',
    nguoiTao: 'hant',
    trangThai: 'Hoạt động',
  },
  {
    id: 7,
    hoVaTen: 'Nguyễn Văn C',
    soDienThoai: '0987654123',
    email: 'user@gmail.com',
    UserName: 'username1',
    vaiTro: 'Tạo lập',
    noiDung: 'Thêm mới',
    ngayTao: '20/01/2022',
    nguoiTao: 'hant',
    trangThai: 'Hoạt động',
  },
  {
    id: 8,
    hoVaTen: 'Nguyễn Văn D',
    soDienThoai: '0987654123',
    email: 'user@gmail.com',
    UserName: 'username1',
    vaiTro: 'Tạo lập',
    noiDung: 'Thêm mới',
    ngayTao: '20/01/2022',
    nguoiTao: 'hant',
    trangThai: 'Hoạt động',
  },
]

const UserManagerPage = props => {
  const { commonStore } = props
  const { device } = commonStore
  const [formApproveBusinessUser] = Form.useForm()

  const [editInfoUserId, setEditInfoUserId] = useState(0)
  const [configGroupUserId, setConfigGroupUserId] = useState(0)
  const [configRoleUserId, setConfigRoleUserId] = useState(0)
  const [visibleDetailModal, setVisibleDetailModal] = useState(false)
  const [visibleGroupModal, setVisibleGroupModal] = useState(false)
  const [visibleRoleModal, setVisibleRoleModal] = useState(false)

  const columns = [
    {
      title: 'STT',
      width: 60,
      align: 'center',
      render: (item, row, index) => index + 1,
    },
    {
      title: 'Họ và tên',
      render: (item, row, index) => item.hoVaTen,
    },
    {
      title: 'Số điện thoại',
      render: (item, row, index) => item.soDienThoai,
    },
    {
      title: 'Email',
      render: (item, row, index) => item.email,
    },
    {
      title: 'Username',
      render: (item, row, index) => item.UserName,
    },
    {
      title: 'Trạng thái',
      render: (item, row, index) => item.trangThai,
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
          <Tooltip title={'Sửa thông tin'} mouseEnterDelay={0.3}>
            <EditOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowDetailUserModal(item.id)} />
          </Tooltip>
          <Tooltip title={'Phân nhóm'} mouseEnterDelay={0.3}>
            <TeamOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowGroupModal(item.id)} />
          </Tooltip>
          <Tooltip title={'Phân quyền'} mouseEnterDelay={0.3}>
            <FileProtectOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowRoleModal(item.id)} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const handleShowDetailUserModal = (userId) => {
    setEditInfoUserId(userId)
    setVisibleDetailModal(true)
  }
  const handleShowGroupModal = (userId) => {
    setConfigGroupUserId(userId)
    setVisibleGroupModal(true)
  }
  const handleShowRoleModal = (userId) => {
    setConfigRoleUserId(userId)
    setVisibleRoleModal(true)
  }

  const handleChangePagination = (pageIndex, pageSize) => {
    console.log(pageIndex, pageSize)
  }

  const handleCloseDetailUserModal = () => {
    setVisibleDetailModal(false)
    setEditInfoUserId(0)
  }
  const handleCloseConfigUserGroupModal = () => {
    setVisibleGroupModal(false)
    setConfigGroupUserId(0)
  }
  const handleCloseConfigUserRoleModal = () => {
    setVisibleRoleModal(false)
    setConfigRoleUserId(0)
  }

  return (
    <DefaultLayout>
      <Helmet>
        <title>Quản lý User</title>
      </Helmet>
      <UserManagerPageWrapper>
        <ColorTitle margin={'0 0 16px 0'}>Quản lý người dùng</ColorTitle>
        <Form
          labelAlign={'left'}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={formApproveBusinessUser}
          colon={false}>
          <Row gutter={[32, 8]} justify={'space-between'}>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Họ và tên'}
                name={'hoVaTen'}>
                <Input maxLength={100} showCount={true} placeholder={'Nhập nội dung'} />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Số điện thoại'}
                name={'soDienThoai'}>
                <Input maxLength={20} showCount={true} placeholder={'Nhập nội dung'} />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Email'}
                name={'email'}>
                <Input maxLength={20} showCount={true} placeholder={'Nhập nội dung'} />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Username'}
                name={'Username'}>
                <Input maxLength={20} showCount={true} placeholder={'Nhập nội dung'} />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Trạng thái'}
                name={'hoTenKh'}>
                <Select placeholder={'Trạng thái'}>
                  <Select.Option value={'1'}>Hoạt động</Select.Option>
                  <Select.Option value={'2'}>Ngừng hoạt động</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Người tạo'}
                name={'nguoiTao'}>
                <Input maxLength={100} showCount={true} placeholder={'Nhập nội dung'} />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item label={'Ngày tạo'} name={'rangerFilterDate'}>
                <RangePicker
                  style={{ width: '100%' }}
                  format='DD/MM/YYYY'
                />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <RowFlexEndDiv>
                <Button
                  style={{minWidth: 120}}
                  block={device === DEVICE.MOBILE}
                  type={'default'}>
                  <SearchOutlined />
                  Tra cứu
                </Button>
              </RowFlexEndDiv>
            </Col>
          </Row>
        </Form>
        <Divider />
        <RowFlexEndDiv margin={'0 0 24px 0'}>
          <Button
            block={device === DEVICE.MOBILE}
            onClick={() => handleShowDetailUserModal(0)}
            type={'primary'}>
            <UserAddOutlined /> Thêm mới
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
        <DetailUserModal
          userId={editInfoUserId}
          visible={visibleDetailModal}
          onClose={handleCloseDetailUserModal} />
        <ConfigUserGroupModal
          userId={configGroupUserId}
          visible={visibleGroupModal}
          onClose={handleCloseConfigUserGroupModal} />
        <ConfigUserRoleModal
          userId={configRoleUserId}
          visible={visibleRoleModal}
          onClose={handleCloseConfigUserRoleModal} />
      </UserManagerPageWrapper>
    </DefaultLayout>
  )
}

UserManagerPage.propTypes = {}

export default inject('authenticationStore', 'commonStore')(observer(UserManagerPage))
