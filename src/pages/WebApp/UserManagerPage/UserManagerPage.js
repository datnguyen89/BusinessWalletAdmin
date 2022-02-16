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
import moment from 'moment'

const { RangePicker } = DatePicker

const UserManagerPage = props => {
  const { commonStore, userManagerStore } = props
  const { device } = commonStore
  const {
    listUsers,
    filterObj,
  } = userManagerStore
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
      render: (item, row, index) => item.Name,
    },
    {
      title: 'Số điện thoại',
      render: (item, row, index) => item.PhoneNumber,
    },
    {
      title: 'Email',
      render: (item, row, index) => item.Email,
    },
    {
      title: 'Username',
      render: (item, row, index) => item.UserName,
    },
    {
      title: 'Trạng thái',
      render: (item, row, index) => item.ActiveStatus,
    },
    {
      title: 'Người tạo',
      render: (item, row, index) => item.CreatedBy,
    },
    {
      title: 'Ngày tạo',
      render: (item, row, index) => moment(item.CreatedDate).format('DD/MM/YYYY HH:mm'),
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
  const handleFilterUser = (e) => {
    let payload = {
      CreatedDateFrom: e.rangerFilterDate ? e.rangerFilterDate[0].valueOf() : 0,
      CreatedDateTo: e.rangerFilterDate ? e.rangerFilterDate[1].valueOf() : 0,
      FullName: e.FullName ? e.FullName : '',
      UserName: e.UserName ? e.UserName : '',
      ActiveStatuses: e.ActiveStatuses ? e.ActiveStatuses : [],
      PageIndex: 1,
      PageSize: 10,
    }
    userManagerStore.setFilterObj(payload)
  }

  useEffect(() => {
    console.log(moment().valueOf())
    commonStore.setAppLoading(true)
    userManagerStore.getListUsers(filterObj)
      .finally(() => commonStore.setAppLoading(false))
  }, [
    filterObj,
  ])

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
                name={'ActiveStatuses'}>
                <Select placeholder={'Tất cả'} allowClear mode={'multiple'}>
                  <Select.Option value={1}>Hoạt động</Select.Option>
                  <Select.Option value={0}>Ngừng hoạt động</Select.Option>
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
          dataSource={listUsers}
          columns={columns}
          rowKey={record => record.UserName}
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
