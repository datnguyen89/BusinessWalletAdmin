import React, { useEffect, useState } from 'react'
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
import ConfigRoleGroupModal from './ConfigRoleGroupModal'


const GroupManagerPage = props => {
  const { commonStore, appSettingStore, groupManagerStore } = props
  const { device, appLoading } = commonStore
  const { clientTypes } = appSettingStore
  const {
    listGroupsPaging,
    filterObj,
    resetFilterObj,
    totalCountGroupsPaging
  } = groupManagerStore
  const [formApproveBusinessGroup] = Form.useForm()

  const [editInfoGroup, setEditInfoGroup] = useState(null)
  const [visibleDetailModal, setVisibleDetailModal] = useState(false)

  const [configUserGroup, setConfigUserGroup] = useState(null)
  const [visibleGroupModal, setVisibleGroupModal] = useState(false)

  const [configRoleGroup, setConfigRoleGroup] = useState(null)
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
      render: (item, row, index) => item.name,
    },
    {
      title: 'Loại hệ thống',
      render: (item, row, index) => item.clientType,
    },
    {
      title: 'Mô tả',
      render: (item, row, index) => item.description,
    },
    {
      align: 'center',
      title: 'Thao tác',
      render: (item, row, index) => (
        <Space size={16}>
          <Tooltip title={'Sửa thông tin nhóm'} mouseEnterDelay={0.3}>
            <EditOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowDetailGroupModal(item)} />
          </Tooltip>
          <Tooltip title={'Thêm người dùng vào nhóm'} mouseEnterDelay={0.3}>
            <TeamOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowGroupModal(item)} />
          </Tooltip>
          <Tooltip title={'Phân quyền nhóm'} mouseEnterDelay={0.3}>
            <FileProtectOutlined
              style={{ cursor: 'pointer', fontSize: 16 }}
              onClick={() => handleShowRoleModal(item)} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const handleShowDetailGroupModal = (group) => {
    setEditInfoGroup(group)
    setVisibleDetailModal(true)
  }
  const handleShowGroupModal = (group) => {
    setConfigUserGroup(group)
    setVisibleGroupModal(true)
  }
  const handleShowRoleModal = (group) => {
    setConfigRoleGroup(group)
    setVisibleRoleModal(true)
  }

  const handleChangePagination = (pageIndex, pageSize) => {
    filterObj.PageIndex = pageIndex
    filterObj.PageSize = pageSize
    groupManagerStore.setFilterObj(filterObj)
    groupManagerStore.getListGroupsPaging()
  }

  const handleFilterGroup = (e) => {
    let newFilterObj = { ...filterObj }
    newFilterObj.Name = e.Name ? e.Name : ''
    newFilterObj.ClientType = e.ClientType ? e.ClientType : ''
    groupManagerStore.setFilterObj(newFilterObj)

    groupManagerStore.getListGroupsPaging()
  }

  const handleCloseDetailGroupModal = () => {
    setVisibleDetailModal(false)
    setEditInfoGroup(null)
  }
  const handleCloseConfigUserGroupModal = () => {
    setVisibleGroupModal(false)
    setConfigUserGroup(null)
  }
  const handleCloseConfigRoleGroupModal = () => {
    setVisibleRoleModal(false)
    setConfigRoleGroup(null)
  }

  useEffect(() => {
    appSettingStore.getClientType()
  }, [])

  useEffect(() => {
    groupManagerStore.getListGroupsPaging()
  }, [])

  useEffect(() => {
    return () => {
      groupManagerStore.setFilterObj(resetFilterObj)
    }
  }, [])

  return (
    <DefaultLayout>
      <Helmet>
        <title>Quản lý nhóm</title>
      </Helmet>
      <GroupManagerPageWrapper>
        <ColorTitle margin={'0 0 16px 0'}>Quản lý nhóm</ColorTitle>
        <Form
          onFinish={handleFilterGroup}
          labelAlign={'left'}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={formApproveBusinessGroup}
          colon={false}>
          <Row gutter={[32, 8]} justify={'center'}>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Tên nhóm'}
                name={'Name'}>
                <Input maxLength={100} showCount={true} placeholder={'Nhập nội dung'} allowClear />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={'Loại hệ thống'}
                name={'ClientType'}>
                <Select placeholder={'Chọn loại hệ thống'} allowClear>
                  {
                    clientTypes && clientTypes.map(item =>
                      <Select.Option key={item} value={item}>{item}</Select.Option>,
                    )
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
              <Button
                style={{ minWidth: 120 }}
                block={device === DEVICE.MOBILE}
                htmlType={'submit'}
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
            onClick={() => handleShowDetailGroupModal(null)}
            type={'primary'}>
            <UserAddOutlined /> Thêm mới nhóm
          </Button>
        </RowFlexEndDiv>
        <Table
          bordered={true}
          scroll={{ x: 1400 }}
          dataSource={listGroupsPaging || []}
          columns={columns}
          rowKey={record => record.groupId}
          pagination={false} />
        <RowSpaceBetweenDiv margin={'16px 0'}>
          {
            listGroupsPaging && listGroupsPaging?.length > 0
              ?
              <PaginationLabel>
                {
                  appLoading === 0 &&
                  `Hiển thị từ
               ${filterObj.PageSize * (filterObj.PageIndex - 1) + 1}
               đến 
               ${filterObj.PageSize * (filterObj.PageIndex - 1) + listGroupsPaging?.length}
               trên tổng số 
               ${totalCountGroupsPaging} bản ghi`
                }
              </PaginationLabel>
              :
              <div />
          }

          <Pagination
            current={filterObj.PageIndex}
            pageSize={filterObj.PageSize}
            total={totalCountGroupsPaging}
            showSizeChanger
            onChange={handleChangePagination} />
        </RowSpaceBetweenDiv>

        <DetailGroupModal
          group={editInfoGroup}
          visible={visibleDetailModal}
          onClose={handleCloseDetailGroupModal} />

        <ConfigGroupUserModal
          group={configUserGroup}
          visible={visibleGroupModal}
          onClose={handleCloseConfigUserGroupModal} />

        <ConfigRoleGroupModal
          group={configRoleGroup}
          onClose={handleCloseConfigRoleGroupModal}
          visible={visibleRoleModal} />

      </GroupManagerPageWrapper>
    </DefaultLayout>
  )
}

GroupManagerPage.propTypes = {}

export default inject('commonStore', 'appSettingStore', 'groupManagerStore')(observer(GroupManagerPage))