import React, { useEffect, useState } from 'react'
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
import {
  EditOutlined,
  FileProtectOutlined,
  SearchOutlined,
  SettingOutlined,
  TeamOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { DEVICE } from '../../../utils/constant'
import DetailUserModal from './DetailUserModal'
import ConfigUserGroupModal from './ConfigUserGroupModal'
import ConfigUserRoleModal from './ConfigUserRoleModal'
import SetPasswordUserModal from './SetPasswordUserModal'
import userManagerStore from '../../../stores/userManagerStore'

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
  const { commonStore, userManagerStore } = props
  const { device } = commonStore
  const { filterPayLoad } = userManagerStore
  const [formFilterUser] = Form.useForm()

  const [editInfoUser, setEditInfoUser] = useState(null)
  const [changePasswordUser, setChangePasswordUser] = useState(null)
  const [configGroupUser, setConfigGroupUser] = useState(null)
  const [configRoleUser, setConfigRoleUser] = useState(null)
  const [visibleDetailModal, setVisibleDetailModal] = useState(false)
  const [visibleSetPasswordModal, setVisibleSetPasswordModal] = useState(false)
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
          <Tooltip title={'Sửa thông tin nguòi dùng'} mouseEnterDelay={0.3}>
            <EditOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowDetailUserModal(item)} />
          </Tooltip>
          <Tooltip title={'Đặt lại mật khẩu nguòi dùng'} mouseEnterDelay={0.3}>
            <SettingOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowSetPasswordModal(item)} />
          </Tooltip>
          <Tooltip title={'Phân nhóm nguòi dùng'} mouseEnterDelay={0.3}>
            <TeamOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowGroupModal(item)} />
          </Tooltip>
          <Tooltip title={'Phân quyền người dùng'} mouseEnterDelay={0.3}>
            <FileProtectOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowRoleModal(item)} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const handleShowDetailUserModal = (user) => {
    setEditInfoUser(user)
    setVisibleDetailModal(true)
  }
  const handleShowSetPasswordModal = (user) => {
    setChangePasswordUser(user)
    setVisibleSetPasswordModal(true)
  }
  const handleShowGroupModal = (user) => {
    setConfigGroupUser(user)
    setVisibleGroupModal(true)
  }
  const handleShowRoleModal = (user) => {
    setConfigRoleUser(user)
    setVisibleRoleModal(true)
  }

  const handleChangePagination = (pageIndex, pageSize) => {
    console.log(pageIndex, pageSize)
  }

  const handleCloseDetailUserModal = () => {
    setVisibleDetailModal(false)
    setEditInfoUser(null)
  }
  const handleCloseSetPasswordModal = () => {
    setVisibleSetPasswordModal(false)
    setChangePasswordUser(null)
  }
  const handleCloseConfigUserGroupModal = () => {
    setVisibleGroupModal(false)
    setConfigGroupUser(null)
  }
  const handleCloseConfigUserRoleModal = () => {
    setVisibleRoleModal(false)
    setConfigRoleUser(null)
  }
  const handleFilterUser = (formCollection) => {
    console.log(formCollection.rangerFilterDate)
    let payload = {
      CreatedDateFrom: formCollection.rangerFilterDate ? formCollection.rangerFilterDate[0].format('DD/MM/YYYY') : "",
      CreatedDateTo: formCollection.rangerFilterDate ? formCollection.rangerFilterDate[1].format('DD/MM/YYYY') : "",
      FullName: '',
      UserName: '',
      ActiveStatus: true,
      PageIndex: 1,
      PageSize: 10,
    }
    userManagerStore.setFilterPayLoad(payload)
  }

  useEffect(() => {
    if (!filterPayLoad) return
    userManagerStore.getListUsers({ ...filterPayLoad })
  }, [filterPayLoad])

  return (
    <DefaultLayout>
      <Helmet>
        <title>Quản lý User</title>
      </Helmet>
      <UserManagerPageWrapper>
        <ColorTitle margin={'0 0 16px 0'}>Quản lý người dùng</ColorTitle>
        <Form
          onFinish={handleFilterUser}
          labelAlign={'left'}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          form={formFilterUser}
          colon={false}>
          <Row gutter={[32, 8]} justify={'space-between'}>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item label={'Ngày tạo'} name={'rangerFilterDate'}>
                <RangePicker
                  style={{ width: '100%' }}
                  format='DD/MM/YYYY'
                />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Họ và tên'}
                name={'FullName'}>
                <Input maxLength={100} showCount={true} placeholder={'Nhập nội dung'} />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Tên đăng nhập'}
                name={'UserName'}>
                <Input maxLength={20} showCount={true} placeholder={'Nhập nội dung'} />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Trạng thái'}
                name={'ActiveStatus'}>
                <Select placeholder={'Tất cả'} allowClear>
                  <Select.Option value={true}>Hoạt động</Select.Option>
                  <Select.Option value={false}>Ngừng hoạt động</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <RowFlexEndDiv>
                <Button
                  style={{ minWidth: 120 }}
                  block={device === DEVICE.MOBILE}
                  htmlType={'submit'}
                  type={'default'}>
                  <SearchOutlined />
                  Tra cứu người dùng
                </Button>
              </RowFlexEndDiv>
            </Col>
          </Row>
        </Form>
        <Divider />
        <RowFlexEndDiv margin={'0 0 24px 0'}>
          <Button
            block={device === DEVICE.MOBILE}
            onClick={() => handleShowDetailUserModal(null)}
            type={'primary'}>
            <UserAddOutlined /> Thêm mới người dùng
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
          user={editInfoUser}
          visible={visibleDetailModal}
          onClose={handleCloseDetailUserModal} />
        <SetPasswordUserModal
          user={changePasswordUser}
          visible={visibleSetPasswordModal}
          onClose={handleCloseSetPasswordModal} />
        <ConfigUserGroupModal
          user={configGroupUser}
          visible={visibleGroupModal}
          onClose={handleCloseConfigUserGroupModal} />
        <ConfigUserRoleModal
          user={configRoleUser}
          visible={visibleRoleModal}
          onClose={handleCloseConfigUserRoleModal} />
      </UserManagerPageWrapper>
    </DefaultLayout>
  )
}

UserManagerPage.propTypes = {}

export default inject('authenticationStore', 'commonStore', 'userManagerStore')(observer(UserManagerPage))
