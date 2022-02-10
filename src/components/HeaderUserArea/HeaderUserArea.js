import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { Divider, Dropdown, Menu } from 'antd'
import UserAvatar from '../UserAvatar'
import ICONS from '../../icons'
import { DropdownUserSetting, HeaderUserAreaWrapper, ThemePickerItem, ThemePickerWrapper } from './HeaderUserAreaStyled'
import { useHistory } from 'react-router-dom'
import ChangePasswordModal from '../ChangePasswordModal'
import { THEME_LIST, TRANSFERS } from '../../utils/constant'
import {
  HeaderDropdownIconWrapper,
  HeaderDropdownItem,
  HeaderDropdownItemText,
  HeaderDropdownWrapper,
} from '../CommonStyled/CommonStyled'
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons'

const HeaderUserArea = props => {

  const { commonStore } = props

  const history = useHistory()
  const handleClickMenu = (path) => {
    history.push(path)
  }

  const [visibleChangePassword, setVisibleChangePassword] = useState(false)

  const handleSuccessChangePassword = () => {
    console.log('Đổi mật khẩu thành công')
  }
  const handleChangeAppTheme = themeName => {
    commonStore.setTheme(themeName)
  }

  const menu = (
    <HeaderDropdownWrapper>
      <HeaderDropdownItem
        justifyContent={'center'}
        onClick={() => setVisibleChangePassword(true)}
        color={commonStore.appTheme.solidColor}>
        <SettingOutlined style={{ fontSize: 20 }} />
        <HeaderDropdownItemText>
          Đổi mật khẩu
        </HeaderDropdownItemText>
      </HeaderDropdownItem>
      <HeaderDropdownItem
        justifyContent={'center'}
        onClick={() => handleClickMenu('/login')}
        color={commonStore.appTheme.solidColor}>
        <LogoutOutlined style={{ fontSize: 20 }} />
        <HeaderDropdownItemText>
          Đăng xuất
        </HeaderDropdownItemText>
      </HeaderDropdownItem>
      <Divider style={{ margin: '8px 0' }} />
      <HeaderDropdownItem
        justifyContent={'center'}
        color={commonStore.appTheme.solidColor}>
        <ThemePickerWrapper>
          {
            THEME_LIST.map(item =>
              <ThemePickerItem
                onClick={() => handleChangeAppTheme(item.name)}
                key={item.name}
                backgroundColor={item.solidColor} />,
            )
          }
        </ThemePickerWrapper>
      </HeaderDropdownItem>
    </HeaderDropdownWrapper>
  )
  return (
    <HeaderUserAreaWrapper id={'user-menu-wrapper'} color={commonStore.appTheme.solidColor}>
      <Dropdown overlay={menu}
                overlayClassName={'header-user-area'}
                placement={'bottomRight'}
                trigger={['click']}
                getPopupContainer={() => document.getElementById('user-menu-wrapper')}>
        <DropdownUserSetting>
          <UserAvatar avatarUrl={null} />
          <span>Administrator</span>
          <img src={ICONS.WHITE_ARROW_DOWN} alt={''} height={8} />
        </DropdownUserSetting>
      </Dropdown>
      <ChangePasswordModal
        visible={visibleChangePassword}
        onSuccess={handleSuccessChangePassword}
        onClose={() => setVisibleChangePassword(false)} />

    </HeaderUserAreaWrapper>
  )
}

HeaderUserArea.propTypes = {}

export default inject('commonStore')(observer(HeaderUserArea))