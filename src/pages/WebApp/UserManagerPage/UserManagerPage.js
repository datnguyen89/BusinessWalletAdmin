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
  const { commonStore, userManagerStore, appSettingStore } = props
  const { device, appLoading } = commonStore
  const { listStatusUser } = appSettingStore
  const {
    listUsers,
    filterObj,
    totalCountUsers,
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
      render: (item, row, index) => (filterObj.PageSize * (filterObj.PageIndex - 1)) + index + 1,
    },
    {
      title: 'Họ và tên',
      render: (item, row, index) => item.name,
    },
    {
      title: 'Số điện thoại',
      render: (item, row, index) => item.phoneNumber,
    },
    {
      title: 'Email',
      render: (item, row, index) => item.email,
    },
    {
      title: 'Username',
      render: (item, row, index) => item.userName,
    },
    {
      title: 'Trạng thái',
      render: (item, row, index) => renderStatus(item.activeStatus),
    },
    {
      title: 'Người tạo',
      render: (item, row, index) => item.createdBy,
    },
    {
      title: 'Ngày tạo',
      render: (item, row, index) => moment(item.createdDate).format('DD/MM/YYYY HH:mm'),
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

  const renderStatus = (stt) => {
    let desc = ''
    if (listStatusUser && listStatusUser.length > 0) {
      desc = listStatusUser.find(e => e.status === stt).description
    }
    return desc
  }

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
    filterObj.PageIndex = pageIndex
    filterObj.PageSize = pageSize
    userManagerStore.setFilterObj(filterObj)
    commonStore.setAppLoading(true)
    userManagerStore.getListUsers()
      .finally(() => commonStore.setAppLoading(false))
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
    let newFilterObj = { ...filterObj }
    newFilterObj.CreatedDateFrom = e.rangerFilterDate ? e.rangerFilterDate[0].valueOf() : 0
    newFilterObj.CreatedDateTo = e.rangerFilterDate ? e.rangerFilterDate[1].valueOf() : 0
    newFilterObj.FullName = e.FullName ? e.FullName : ''
    newFilterObj.UserName = e.UserName ? e.UserName : ''
    newFilterObj.ActiveStatuses = e.ActiveStatuses ? e.ActiveStatuses : []
    userManagerStore.setFilterObj(newFilterObj)

    commonStore.setAppLoading(true)
    userManagerStore.getListUsers()
      .finally(() => commonStore.setAppLoading(false))
  }

  useEffect(() => {
    commonStore.setAppLoading(true)
    userManagerStore.getListUsers()
      .finally(() => commonStore.setAppLoading(false))
  }, [])

  useEffect(() => {
    appSettingStore.getListStatusUser()
  }, [])

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
                  {
                    listStatusUser && listStatusUser.map(item =>
                      <Select.Option key={item.status} value={item.status}>{item.description}</Select.Option>,
                    )
                  }
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
          dataSource={appLoading === 0 ? listUsers : []}
          columns={columns}
          rowKey={record => record.userId}
          pagination={false} />

        <RowSpaceBetweenDiv margin={'16px 0'}>
          <PaginationLabel>
            {
              appLoading === 0 &&
              `Hiển thị từ
               ${filterObj.PageSize * (filterObj.PageIndex - 1) + 1}
               đến 
               ${filterObj.PageSize * (filterObj.PageIndex - 1) + listUsers?.length}
               trên tổng số 
               ${totalCountUsers} bản ghi`
            }
          </PaginationLabel>
          <Pagination
            current={filterObj.PageIndex}
            pageSize={filterObj.PageSize}
            total={totalCountUsers}
            showSizeChanger
            onChange={handleChangePagination} />
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

export default inject(
  'authenticationStore',
  'commonStore',
  'userManagerStore',
  'appSettingStore',
)(observer(UserManagerPage))
