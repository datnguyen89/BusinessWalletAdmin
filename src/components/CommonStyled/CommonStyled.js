import styled from 'styled-components'
import { Link } from 'react-router-dom'


export const PaginationLabel = styled.span`
  color: #767676;
  @media only screen and (max-width: 768px) {
    margin-bottom: 16px;
  }
`
export const RowCenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
`
export const RowFlexEndDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
`
export const RowSpaceBetweenDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`
export const ColorTitle = styled.h1`
  padding: ${props => props.padding || '8px'};
  margin: ${props => props.margin || 0};
  color: ${props => props.color || '#848788'};
  background: ${props => props.background || '#F6F6F6'};
  text-align: ${props => props.textAlign || 'left'};
  font-size: ${props => props.fontSize || '14px'};
`
export const ColorText = styled.span`
  color: ${props => props.color || '#333'};
  background: ${props => props.background || 'transparent'};
  font-weight: ${props => props.fontWeight || 'normal'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '1.4rem'};
  font-weight: ${props => props.fontWeight || 400};
`
export const HeaderDropdownWrapper = styled.div`
  background: #fff;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  border-radius: 2px;
  padding: 8px;
`
export const HeaderDropdownIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const HeaderDropdownItemText = styled.div`
  color: #333;
  margin-left: 8px;
  @media only screen and (max-width: 992px) {
    font-size: 12px;
  }
`
export const HeaderDropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  &:hover {
    ${HeaderDropdownItemText} {
      color: ${props => props.color};
    }
  }
`
export const ColorLink = styled(Link)`
  color: ${props => props.color};
`
export const HeaderBackground = styled.h1`
  background-color: ${props => props.backgroundColor};
  padding: ${props => props.padding || '16px'};

  svg, img {
    margin-right: 8px;
  }
`
export const MenuSideBarTitle = styled.span`
  margin-left: 12px;
  padding-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  display: ${props => props.isCollapse ? 'none' : 'block'};
`
export const MenuSidebarItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px;
  margin: 8px 12px 0 12px;

  &:hover, &.active {
    background: #ffffff;
    color: ${props => props.color};

    svg path {
      fill: ${props => props.color} !important;
    }

    ${MenuSideBarTitle} {
      color: ${props => props.color};
    }
  }

`

export const GroupMenuTitle = styled.h1`
  text-align: ${props => props.textAlign};
  margin: 8px 12px 0 12px;
`