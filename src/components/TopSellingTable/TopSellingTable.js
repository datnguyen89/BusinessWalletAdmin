import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { DEVICE } from '../../utils/constant'

const TopSellingTable = props => {

  const { commonStore } = props
  const { device } = commonStore

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => b.age - a.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      responsive: ['md']
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },

  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 12,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 22,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '4',
      name: 'Joe Black',
      age: 42,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '5',
      name: 'Joe Black',
      age: 52,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '6',
      name: 'Joe Black',
      age: 62,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '7',
      name: 'Joe Black',
      age: 72,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '8',
      name: 'Joe Black',
      age: 82,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '9',
      name: 'Joe Black',
      age: 92,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination)
    console.log(pagination)
    console.log(filters)
    console.log(sorter)
  }

  return (
    <div>
      <Table
        size={device === DEVICE.DESKTOP ? 'large' : 'small'}
        columns={columns}
        rowKey={record => record.key}
        dataSource={data}
        onChange={handleTableChange}
        pagination={pagination} />
    </div>
  )
}

TopSellingTable.propTypes = {}

export default inject('commonStore')(observer(TopSellingTable))