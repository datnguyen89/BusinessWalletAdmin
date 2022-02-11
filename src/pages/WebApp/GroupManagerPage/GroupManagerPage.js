import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { GroupManagerPageWrapper } from './GroupManagerPageStyled'
import DefaultLayout from '../../../layouts/DefaultLayout'
import { Helmet } from 'react-helmet/es/Helmet'
import { ColorTitle } from '../../../components/CommonStyled/CommonStyled'

const GroupManagerPage = props => {
  const { commonStore } = props
  return (
    <DefaultLayout>
      <Helmet>
        <title>Quản lý nhóm</title>
      </Helmet>
      <GroupManagerPageWrapper>
        <ColorTitle margin={'0 0 16px 0'}>Quản lý nhóm</ColorTitle>

      </GroupManagerPageWrapper>
    </DefaultLayout>
  )
}

GroupManagerPage.propTypes = {}

export default inject('commonStore')(observer(GroupManagerPage))