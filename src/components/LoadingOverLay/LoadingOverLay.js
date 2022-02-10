import React from 'react'
import { inject, observer } from 'mobx-react'
import { LoadingOverLayWrapper } from './LoadingOverLayStyled'
import { Spin } from 'antd'

const LoadingOverLay = props => {
  const { commonStore } = props
  const { appLoading } = commonStore
  return (
    appLoading > 0 &&
    <LoadingOverLayWrapper>
      <Spin size={'large'} />
    </LoadingOverLayWrapper>
  )
}

export default inject('commonStore')(observer(LoadingOverLay))