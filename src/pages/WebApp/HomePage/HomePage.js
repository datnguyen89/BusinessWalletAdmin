import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import DefaultLayout from '../../../layouts/DefaultLayout'
import { Helmet } from 'react-helmet/es/Helmet'
import { HomePageWrapper, HomeWhiteBox } from './HomePageStyled'
import { Col, Row, Timeline } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faDollarSign, faFileContract, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { ArrowUpOutlined } from '@ant-design/icons'
import CardDashboard from '../../../components/CardDashboard/CardDashboard'
import ColumnChart from '../../../components/Charts/ColumnChart'
import { ColorText, ColorTitle } from '../../../components/CommonStyled/CommonStyled'
import LineChart from '../../../components/Charts/LineChart'
import BarChart from '../../../components/Charts/BarChart'
import DonutChart from '../../../components/Charts/DonutChart'
import TopSellingTable from '../../../components/TopSellingTable/TopSellingTable'


const HomePage = props => {
  const { commonStore, authenticationStore } = props
  const { appTheme } = commonStore

  return (
    <DefaultLayout>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <HomePageWrapper>
        <ColorTitle fontSize={'16px'} background={'transparent'}>Dashboard</ColorTitle>
      </HomePageWrapper>
    </DefaultLayout>
  )
}

HomePage.propTypes = {}

export default inject('commonStore', 'authenticationStore')(observer(HomePage))