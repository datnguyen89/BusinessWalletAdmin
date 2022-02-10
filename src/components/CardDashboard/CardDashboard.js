import React from 'react'
import PropTypes from 'prop-types'

import { Card } from 'antd'
import {
  CardDashBoardContent,
  CardDashBoardHeader,
  CardDashBoardNumber, CardDashBoardNumberWrapper, CardDashBoardSubText,
  CardDashBoardTitle,
} from './CardDashboardStyled'

const CardDashboard = props => {
  const { title, avatar, content, icon, number, numberColor } = props
  return (
    <Card hoverable>
      <CardDashBoardHeader>
        <CardDashBoardTitle>{title}</CardDashBoardTitle>
        {avatar}
      </CardDashBoardHeader>
      <CardDashBoardContent>{content}</CardDashBoardContent>
      <CardDashBoardNumberWrapper>
        <CardDashBoardNumber color={numberColor}>{icon} {number}%</CardDashBoardNumber>
        <CardDashBoardSubText>So với tháng trước</CardDashBoardSubText>
      </CardDashBoardNumberWrapper>
    </Card>
  )
}

CardDashboard.propTypes = {
  title: PropTypes.string.isRequired,
  avatar: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  number: PropTypes.string.isRequired,
  numberColor: PropTypes.string,
}

export default CardDashboard