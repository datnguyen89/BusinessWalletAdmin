import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { TestPageWrapper } from './TestPageStyled'
import UploadCropModule from '../../../components/UploadCropModule'
import DefaultLayout from '../../../layouts/DefaultLayout/DefaultLayout'
import { Helmet } from 'react-helmet/es/Helmet'
import LineChart from '../../../components/Charts/LineChart'
import ColumnChart from '../../../components/Charts/ColumnChart'
import BarChart from '../../../components/Charts/BarChart'
import DonutChart from '../../../components/Charts/DonutChart'
import { Button, Form, TreeSelect } from 'antd'

const { SHOW_CHILD } = TreeSelect

const treeData = [
  {
    title: 'Tạo lập',
    value: '1',
    children: [
      {
        title: 'Khởi tạo giao dịch',
        value: '2',
        children: [
          {
            title: 'Trạng thái chờ duyệt',
            value: '3',
          },
        ],
      },
      {
        title: 'Quản lý giao dịch tạo lập',
        value: '4',
        children: [
          {
            title: 'Sửa',
            value: '5',
          },
          {
            title: 'Xóa',
            value: '6',
          },
        ],
      },
    ],
  },
  {
    title: 'Phê duyệt',
    value: '11',
    children: [
      {
        title: 'Quản lý giao dịch',
        value: '22',
        children: [
          {
            title: 'Phê duyệt',
            value: '33',
          },
        ],
      },
    ],
  },
]

const TestPageStyled = props => {
  const { commonStore, testStore } = props
  const { appTheme } = commonStore

  const handleClick = () => {
    const payload = { a: 1 }
    testStore.testRq(payload)
  }

  return (
    <DefaultLayout>
      <Helmet>
        <title>Test</title>
      </Helmet>
      <TestPageWrapper>
        <Button type={'primary'} onClick={handleClick}>OK</Button>
      </TestPageWrapper>
    </DefaultLayout>

  )
}

TestPageStyled.propTypes = {}

export default inject('commonStore', 'testStore')(observer(TestPageStyled))