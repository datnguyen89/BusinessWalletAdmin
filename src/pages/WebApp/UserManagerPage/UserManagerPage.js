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
import { toJS } from 'mobx'

const { RangePicker } = DatePicker

const UserManagerPage = props => {
  const { commonStore, userManagerStore, appSettingStore } = props
  const { device, appLoading } = commonStore
  const { listStatusUser } = appSettingStore
  const {
    listUsers,
    filterObj,
    resetFilterObj,
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
      title: 'H??? v?? t??n',
      render: (item, row, index) => item.name,
    },
    {
      title: 'S??? ??i???n tho???i',
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
      title: 'Tr???ng th??i',
      render: (item, row, index) => renderStatus(item.activeStatus),
    },
    {
      title: 'Ng?????i t???o',
      render: (item, row, index) => item.createdBy,
    },
    {
      title: 'Ng??y t???o',
      render: (item, row, index) => moment(item.createdDate).format('DD/MM/YYYY HH:mm'),
    },
    {
      align: 'center',
      title: 'Thao t??c',
      render: (item, row, index) => (
        <Space size={16}>
          <Tooltip title={'S???a th??ng tin ngu??i d??ng'} mouseEnterDelay={0.3}>
            <EditOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowDetailUserModal(item)} />
          </Tooltip>
          <Tooltip title={'?????t l???i m???t kh???u ngu??i d??ng'} mouseEnterDelay={0.3}>
            <SettingOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowSetPasswordModal(item)} />
          </Tooltip>
          <Tooltip title={'Ph??n nh??m ngu??i d??ng'} mouseEnterDelay={0.3}>
            <TeamOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowGroupModal(item)} />
          </Tooltip>
          <Tooltip title={'Ph??n quy???n ng?????i d??ng'} mouseEnterDelay={0.3}>
            <FileProtectOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowRoleModal(item)} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const renderStatus = (stt) => {
    if (!listStatusUser) return
    let desc = ''
    if (listStatusUser && listStatusUser.length > 0) {
      desc = listStatusUser.find(e => e.status === stt)?.description
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
    userManagerStore.getListUsers()
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
    filterObj.CreatedDateFrom = e.rangerFilterDate ? e.rangerFilterDate[0].valueOf() : 0
    filterObj.CreatedDateTo = e.rangerFilterDate ? e.rangerFilterDate[1].valueOf() : 0
    filterObj.FullName = e.FullNameFilter ? e.FullNameFilter : ''
    filterObj.UserName = e.UserNameFilter ? e.UserNameFilter : ''
    filterObj.ActiveStatuses = e.ActiveStatuses ? e.ActiveStatuses : []
    userManagerStore.setFilterObj(filterObj)

    userManagerStore.getListUsers()
  }

  useEffect(() => {
    userManagerStore.getListUsers()
  }, [])

  useEffect(() => {
    appSettingStore.getListStatusUser()
  }, [])

  useEffect(() => {
    return () => {
      userManagerStore.setFilterObj(resetFilterObj)
    }
  }, [])

  useEffect(() => {
    console.log('listUsers',toJS(listUsers))
  }, [listUsers])

  return (
    <DefaultLayout>
      <Helmet>
        <title>Qu???n l?? User</title>
      </Helmet>
      <UserManagerPageWrapper>
        <ColorTitle margin={'0 0 16px 0'}>Qu???n l?? ng?????i d??ng</ColorTitle>
        <Form
          onFinish={handleFilterUser}
          labelAlign={'left'}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          form={formFilterUser}
          colon={false}>
          <Row gutter={[32, 8]} justify={'space-between'}>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item label={'Ng??y t???o'} name={'rangerFilterDate'}>
                <RangePicker
                  style={{ width: '100%' }}
                  format='DD/MM/YYYY'
                />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'H??? v?? t??n'}
                name={'FullNameFilter'}>
                <Input maxLength={100} showCount={true} placeholder={'Nh???p n???i dung'} />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'T??n ????ng nh???p'}
                name={'UserNameFilter'}>
                <Input maxLength={20} showCount={true} placeholder={'Nh???p n???i dung'} />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Tr???ng th??i'}
                name={'ActiveStatuses'}>
                <Select placeholder={'T???t c???'} allowClear mode={'multiple'}>
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
                  Tra c???u ng?????i d??ng
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
            <UserAddOutlined /> Th??m m???i ng?????i d??ng
          </Button>
        </RowFlexEndDiv>

        <Table
          bordered={true}
          scroll={{ x: 1400 }}
          dataSource={listUsers || []}
          columns={columns}
          rowKey={record => record.userId}
          pagination={false} />

        <RowSpaceBetweenDiv margin={'16px 0'}>
          {
            listUsers?.length ?
              <PaginationLabel>
                {
                  appLoading === 0 &&
                  `Hi???n th??? t???
               ${filterObj.PageSize * (filterObj.PageIndex - 1) + 1}
               ?????n 
               ${filterObj.PageSize * (filterObj.PageIndex - 1) + listUsers?.length}
               tr??n t???ng s??? 
               ${totalCountUsers} b???n ghi`
                }
              </PaginationLabel>
              :
              <div />
          }

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
