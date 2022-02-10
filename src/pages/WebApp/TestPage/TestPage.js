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
  const { commonStore } = props
  const { appTheme } = commonStore

  const [formTest] = Form.useForm()

  const [fileToUpload, setFileToUpload] = useState()
  const [fileToPreview, setFileToPreview] = useState()

  const tProps = {
    treeData,
    treeDefaultExpandAll: true,
    treeCheckable: true,
    showCheckedStrategy: SHOW_CHILD,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  }
  const onFinish = (e) => {
    console.log(e)
  }

  useEffect(() => {
    formTest.setFieldsValue({
      treeSelect: ['5', '6'],
    })
  }, [])

  useEffect(() => {
    console.log('fileToUpload', fileToUpload)
    console.log('fileToPreview', fileToPreview)
  }, [fileToUpload, fileToPreview])


  return (
    <DefaultLayout>
      <Helmet>
        <title>Test</title>
      </Helmet>
      <TestPageWrapper>
        {/*<UploadCropModule callbackFileCropped={(e) => setFileToUpload(e)}*/}
        {/*                  callbackFileSrcPreview={(e) => setFileToPreview(e)} grid={true} rotate={true} />*/}
        <img src={fileToPreview} alt={''} />

        <Form form={formTest} onFinish={onFinish}>
          <Form.Item label={'tree'} name={'treeSelect'}>
            <TreeSelect {...tProps} />
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} htmlType={'submit'}>OK</Button>
          </Form.Item>
        </Form>
      </TestPageWrapper>
    </DefaultLayout>

  )
}

TestPageStyled.propTypes = {}

export default inject('commonStore')(observer(TestPageStyled))