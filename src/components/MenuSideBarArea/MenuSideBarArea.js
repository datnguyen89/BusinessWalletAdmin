import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { MenuSidebarAreaWrapper } from './MenuSideBarAreaStyled'
import { GroupMenuTitle, MenuSidebarItem, MenuSideBarTitle } from '../CommonStyled/CommonStyled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faStamp, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { PAGES } from '../../utils/constant'
import { BankOutlined, PartitionOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

const MenuSideBarArea = props => {
  const { commonStore } = props
  const { appTheme, pageName } = commonStore
  const history = useHistory()

  const handleClickMenu = (path) => {
    history.push(path)
  }
  return (
    <MenuSidebarAreaWrapper>
      <GroupMenuTitle textAlign={commonStore.isCollapse ? 'center' : 'left'}>
        {commonStore.isCollapse
          ? <FontAwesomeIcon size={'lg'} color={'#6634E0'} icon={faBuilding} />
          : 'Administrator'}
      </GroupMenuTitle>
      <MenuSidebarItem
        onClick={() => handleClickMenu(PAGES.USER_MANAGER.PATH)}
        className={pageName === PAGES.USER_MANAGER.NAME ? 'active' : ''}
        color={appTheme.solidColor}>
        <UsergroupAddOutlined />
        <MenuSideBarTitle isCollapse={commonStore.isCollapse}>Quản lý người dùng</MenuSideBarTitle>
      </MenuSidebarItem>
      <MenuSidebarItem
        onClick={() => handleClickMenu(PAGES.GROUP_MANAGER.PATH)}
        className={pageName === PAGES.GROUP_MANAGER.NAME ? 'active' : ''}
        color={appTheme.solidColor}>
        <PartitionOutlined />
        <MenuSideBarTitle isCollapse={commonStore.isCollapse}>Quản lý nhóm</MenuSideBarTitle>
      </MenuSidebarItem>
    </MenuSidebarAreaWrapper>
  )
}

MenuSideBarArea.propTypes = {}

export default inject('commonStore')(observer(MenuSideBarArea))