import styled from 'styled-components'

export const HeaderUserAreaWrapper = styled.a`
  color: #fff;
  display: flex;
  align-items: center;

  .header-user-area {
  }

  &:hover {
    color: #fff !important;
  }

  span {
    margin: 0 8px;
    font-size: 1.4rem;
  }

  .user-menu-item {
    .ant-dropdown-menu-title-content {
      display: flex;
      align-items: center;
    }

    &:hover {
      .user-menu-label {
        color: ${props => props.color};
      }

      svg path {
        fill: ${props => props.color};
      }
    }
  }
`
export const DropdownUserSetting = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
`
export const ThemePickerWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
export const ThemePickerItem = styled.li`
  background-color: ${props => props.backgroundColor};
  border-radius: 50%;
  width: 24px;
  height: 24px;
`