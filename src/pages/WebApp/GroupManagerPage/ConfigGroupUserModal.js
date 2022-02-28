import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Select,
  Table,
  Tooltip,
} from 'antd'
import { DEVICE } from '../../../utils/constant'
import { PaginationLabel, RowFlexEndDiv, RowSpaceBetweenDiv } from '../../../components/CommonStyled/CommonStyled'
import { DeleteOutlined, ExclamationCircleOutlined, SearchOutlined, StopOutlined } from '@ant-design/icons'
import DebounceSelect from '../../../components/DebounceSelect/DebounceSelect'

const { RangePicker } = DatePicker
const { confirm } = Modal

const ConfigGroupUserModal = props => {
  const { group, visible, onClose, commonStore, groupManagerStore, appSettingStore } = props
  const { device, appLoading } = commonStore
  const { filterObjUser, resetFilterObjUser, listUsersInGroup, totalCountUsersInGroup } = groupManagerStore
  const { listStatusUser } = appSettingStore

  const [formAddUserInGroup] = Form.useForm()
  const [formFilterUserInGroup] = Form.useForm()

  const [initOption, setInitOption] = useState([])

  const columns = [
    {
      title: 'STT',
      width: 60,
      align: 'center',
      render: (item, row, index) => (filterObjUser.PageSize * (filterObjUser.PageIndex - 1)) + index + 1,
    },
    {
      title: 'Họ và tên',
      render: (item, row, index) => item.name,
    },
    {
      title: 'Tên đăng nhập',
      render: (item, row, index) => item.userName,
    },
    {
      title: 'Trạng thái',
      render: (item, row, index) => renderStatus(item.activeStatus),
    },
    {
      width: 100,
      align: 'center',
      title: 'Thao tác',
      render: (item, row, index) => (
        <Tooltip title={'Xóa khỏi nhóm'} mouseEnterDelay={0.3}>
          <StopOutlined
            onClick={() => handleClickRemoveFromGroup(item)}
            style={{ cursor: 'pointer', fontSize: 16 }} />
        </Tooltip>
      ),
    },
  ]
  const handleClickRemoveFromGroup = (user) => {
    confirm({
      title: `Xóa ${user.userName} khỏi nhóm ${group?.name}`,
      icon: <ExclamationCircleOutlined />,
      content: 'Người dùng bị xóa khỏi nhóm sẽ mất các quyền được phân cho nhóm',
      okText: 'Xóa',
      cancelText: 'Không xóa',
      onOk() {
        let payload = {
          GroupId: group?.groupId,
          UserId: user?.userId,
        }
        groupManagerStore.removeUserFromGroup(payload)
          .then(res => {
            if (res?.responseCode === 0) {
              message.success(`Xóa người dùng  ${user.userName} khỏi nhóm ${group?.name} thành công`)
              formAddUserInGroup.resetFields()
              formFilterUserInGroup.resetFields()
              groupManagerStore.setFilterObjUser(resetFilterObjUser)
              groupManagerStore.getListUsersInGroup()
            }
          })
      },
      onCancel() {

      },
    })
  }
  const renderStatus = (stt) => {
    let desc = ''
    if (listStatusUser && listStatusUser.length > 0) {
      desc = listStatusUser.find(e => e.status === stt).description
    }
    return desc
  }

  const handleFilterUser = (e) => {
    filterObjUser.CreatedDateFrom = e.rangerFilterDate ? e.rangerFilterDate[0].valueOf() : 0
    filterObjUser.CreatedDateTo = e.rangerFilterDate ? e.rangerFilterDate[1].valueOf() : 0
    filterObjUser.FullName = e.FullName ? e.FullName : ''
    filterObjUser.ActiveStatuses = e.ActiveStatuses ? e.ActiveStatuses : []
    groupManagerStore.setFilterObjUser(filterObjUser)

    groupManagerStore.getListUsersInGroup()
  }
  const handleAddUserIntoGroup = (e) => {
    if (!e.Users || e.Users?.length === 0) return
    let listUserId = e.Users.map(item => item.key)
    let payload = {
      GroupId: group?.groupId,
      UserIds: listUserId,
    }
    groupManagerStore.updateUserForGroup(payload)
      .then(res => {
        if (res?.responseCode === 0) {
          message.success(`Thêm người dùng vào nhóm ${group?.name} thành công`)
          formAddUserInGroup.resetFields()
          formFilterUserInGroup.resetFields()
          groupManagerStore.setFilterObjUser(resetFilterObjUser)
          groupManagerStore.getListUsersInGroup()
        }
      })
  }
  const handleCancel = () => {
    formAddUserInGroup.resetFields()
    formFilterUserInGroup.resetFields()
    groupManagerStore.setFilterObjUser(resetFilterObjUser)
    groupManagerStore.resetUserInGroup()
    onClose()
  }

  const handleChangePagination = (pageIndex, pageSize) => {
    filterObjUser.PageIndex = pageIndex
    filterObjUser.PageSize = pageSize
    groupManagerStore.setFilterObjUser(filterObjUser)
    groupManagerStore.getListUsersInGroup()
  }

  const [value, setValue] = React.useState([])

  async function fetchUserList(username) {

    let payload = {
      GroupId: group.groupId,
      Keyword: username,
    }
    return groupManagerStore.searchUserNotInGroupByKeyword(payload)
      .then((res) =>
        res.map((user) => ({
          label: `${user.userName} - ${user.name}`,
          value: user.userId,
          key: user.userId,
        })),
      )
  }

  useEffect(() => {
    if (!group) return
    filterObjUser.GroupId = group.groupId
    groupManagerStore.getListUsersInGroup()
  }, [group])

  useEffect(() => {
    appSettingStore.getListStatusUser()
  }, [])

  useEffect(() => {
    if (!group) return
    let payload = {
      GroupId: group.groupId,
      Keyword: '',
    }
    groupManagerStore.searchUserNotInGroupByKeyword(payload)
      .then(res => {
        if (!res || res?.length === 0) return
        let initUsers = []
        initUsers = res.map(user => {
          return {
            label: `${user.userName} - ${user.name}`,
            value: user.userId,
            key: user.userId,
          }
        })
        setInitOption(initUsers)
      })
  }, [group])


  return (
    <Modal
      width={'90%'}
      bodyStyle={{ minHeight: 780 }}
      style={{ top: 50 }}
      title={`Cập nhật người dùng trong nhóm ${group?.name}`}
      visible={visible}
      footer={null}
      onCancel={handleCancel}>
      <Form
        labelAlign={'left'}
        labelCol={{ xxl: 8, xl: 8, lg: 8, md: 10, sm: 24, xs: 24 }}
        wrapperCol={{ xxl: 16, xl: 16, lg: 16, md: 14, sm: 24, xs: 24 }}
        form={formAddUserInGroup}
        onFinish={handleAddUserIntoGroup}
        colon={false}>
        <Row justify={'space-between'} gutter={32}>
          <Col xxl={21} xl={20} lg={20} md={19} sm={24} xs={24}>
            <Form.Item label={'Thêm người dùng vào nhóm'} name={'Users'}>
              <DebounceSelect
                mode='multiple'
                value={value}
                placeholder='Tìm kiếm theo tên đăng nhập hoặc họ tên'
                initOption={initOption}
                fetchOptions={fetchUserList}
                onChange={(newValue) => {
                  setValue(newValue)
                }}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
          </Col>
          <Col xxl={3} xl={4} lg={4} md={5} sm={24} xs={24}>
            <Button block type={'primary'} onClick={() => formAddUserInGroup.submit()}>Lưu thông tin</Button>
          </Col>
        </Row>
      </Form>
      <Divider />
      <Form
        onFinish={handleFilterUser}
        labelAlign={'left'}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={formFilterUserInGroup}
        colon={false}>
        <Row gutter={[32, 8]} justify={'space-between'}>
          <Col xxl={7} xl={7} lg={12} md={24} sm={24} xs={24}>
            <Form.Item label={'Ngày tạo'} name={'rangerFilterDate'}>
              <RangePicker
                style={{ width: '100%' }}
                format='DD/MM/YYYY'
              />
            </Form.Item>
          </Col>
          <Col xxl={7} xl={7} lg={12} md={24} sm={24} xs={24}>
            <Form.Item
              label={'Họ và tên'}
              name={'FullName'}>
              <Input maxLength={100} showCount={true} placeholder={'Nhập nội dung'} />
            </Form.Item>
          </Col>
          <Col xxl={7} xl={7} lg={12} md={24} sm={24} xs={24}>
            <Form.Item
              label={'Trạng thái'}
              name={'ActiveStatuses'}>
              <Select placeholder={'Tất cả'} mode={'multiple'} allowClear={true}>
                {
                  listStatusUser && listStatusUser.map(item =>
                    <Select.Option key={item.status} value={item.status}>{item.description}</Select.Option>,
                  )
                }
              </Select>
            </Form.Item>
          </Col>

          <Col xxl={3} xl={3} lg={12} md={24} sm={24} xs={24}>
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
      <Table
        size={'small'}
        bordered={true}
        scroll={{ x: 1400 }}
        dataSource={appLoading === 0 ? listUsersInGroup : []}
        columns={columns}
        rowKey={record => record.userId}
        pagination={false} />
      <RowSpaceBetweenDiv margin={'16px 0'}>
        {
          listUsersInGroup?.length > 0 ?
            <PaginationLabel>
              {
                appLoading === 0 &&
                `Hiển thị từ
               ${filterObjUser.PageSize * (filterObjUser.PageIndex - 1) + 1}
               đến 
               ${filterObjUser.PageSize * (filterObjUser.PageIndex - 1) + listUsersInGroup?.length}
               trên tổng số 
               ${totalCountUsersInGroup} bản ghi`
              }
            </PaginationLabel>
            :
            <div></div>
        }

        <Pagination
          current={filterObjUser.PageIndex}
          pageSize={filterObjUser.PageSize}
          total={totalCountUsersInGroup}
          showSizeChanger
          onChange={handleChangePagination} />
      </RowSpaceBetweenDiv>


    </Modal>
  )
}

ConfigGroupUserModal.propTypes = {
  group: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default inject('commonStore', 'groupManagerStore', 'appSettingStore')(observer(ConfigGroupUserModal))