import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, Col, DatePicker, Divider, Form, Input, Modal, Pagination, Row, Select, Table, Tooltip } from 'antd'
import { DEVICE } from '../../../utils/constant'
import { PaginationLabel, RowFlexEndDiv, RowSpaceBetweenDiv } from '../../../components/CommonStyled/CommonStyled'
import { DeleteOutlined, SearchOutlined, StopOutlined } from '@ant-design/icons'

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
  {
    id: 9,
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
    id: 10,
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


const ConfigGroupUserModal = props => {
  const { group, visible, onClose, commonStore } = props
  const { device } = commonStore

  const [formAddUserInGroup] = Form.useForm()
  const [formFilterUserInGroup] = Form.useForm()

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
      title: 'Username',
      render: (item, row, index) => item.UserName,
    },
    {
      title: 'Trạng thái',
      render: (item, row, index) => item.trangThai,
    },
    {
      width: 100,
      align: 'center',
      title: 'Thao tác',
      render: (item, row, index) => (
        <Tooltip title={'Xóa khỏi nhóm'} mouseEnterDelay={0.3}>
          <StopOutlined
            style={{ cursor: 'pointer', fontSize: 16 }} />
        </Tooltip>
      ),
    },
  ]

  const onFinish = (formCollection) => {
    console.log(formCollection)
  }
  const handleCancel = () => {
    formAddUserInGroup.resetFields()
    onClose()
  }

  const handleChangePagination = (pageIndex, pageSize) => {
    console.log(pageIndex, pageSize)
  }

  useEffect(() => {
    console.log(group)
    if (group) {
      //// Get list user in group depend group

    }
  }, [group])

  return (
    <Modal
      width={'90%'}
      style={{ top: 50 }}
      title={`Cập nhật người dùng trong nhóm ${group?.tenNhom}`}
      visible={visible}
      footer={null}
      onCancel={handleCancel}>
      <Form
        labelAlign={'left'}
        labelCol={{ xxl: 8, xl: 8, lg: 8, md: 8, sm: 8, xs: 8 }}
        wrapperCol={{ xxl: 8, xl: 8, lg: 8, md: 8, sm: 8, xs: 8 }}
        form={formAddUserInGroup}
        onFinish={onFinish}
        colon={false}>
        <Form.Item label={'Thêm người dùng vào nhóm'} name={'Users'}>
          <Select
            mode={'multiple'}
            showSearch
            optionFilterProp={'name'}>
            <Select.Option value={1} name={'Người dùng 1'}>Người dùng 1</Select.Option>
            <Select.Option value={2} name={'Người dùng 2'}>Người dùng 2</Select.Option>
            <Select.Option value={3} name={'Người dùng 3'}>Người dùng 3</Select.Option>
            <Select.Option value={4} name={'Người dùng 4'}>Người dùng 4</Select.Option>
          </Select>
        </Form.Item>

      </Form>
      <Divider />
      <Form
        labelAlign={'left'}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={formFilterUserInGroup}
        colon={false}>
        <Row gutter={[32, 8]} justify={'space-between'}>
          <Col xxl={7} xl={7} lg={12} md={24} sm={24} xs={24}>
            <Form.Item
              label={'Họ và tên'}
              name={'hoVaTen'}>
              <Input maxLength={100} showCount={true} placeholder={'Nhập nội dung'} />
            </Form.Item>
          </Col>
          <Col xxl={7} xl={7} lg={12} md={24} sm={24} xs={24}>
            <Form.Item
              label={'Trạng thái'}
              name={'hoTenKh'}>
              <Select placeholder={'Trạng thái'}>
                <Select.Option value={'1'}>Hoạt động</Select.Option>
                <Select.Option value={'2'}>Ngừng hoạt động</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={7} xl={7} lg={12} md={24} sm={24} xs={24}>
            <Form.Item label={'Ngày tạo'} name={'rangerFilterDate'}>
              <RangePicker
                style={{ width: '100%' }}
                format='DD/MM/YYYY'
              />
            </Form.Item>
          </Col>
          <Col xxl={3} xl={3} lg={12} md={24} sm={24} xs={24}>
            <RowFlexEndDiv>
              <Button
                style={{ minWidth: 120 }}
                block={device === DEVICE.MOBILE}
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

      <Row justify={'center'} gutter={32}>
        <Col xxl={3} xl={4} lg={6} md={6} sm={8} xs={12}>
          <Button onClick={handleCancel} block>Hủy</Button>
        </Col>
        <Col xxl={3} xl={4} lg={6} md={6} sm={8} xs={12}>
          <Button block type={'primary'} onClick={() => formAddUserInGroup.submit()}>Lưu thông tin</Button>
        </Col>
      </Row>
    </Modal>
  )
}

ConfigGroupUserModal.propTypes = {
  group: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default inject('commonStore')(observer(ConfigGroupUserModal))