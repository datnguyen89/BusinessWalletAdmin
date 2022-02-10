import styled from 'styled-components'
import IMAGES from '../../images'

export const MainSideBarWrapper = styled.aside`
  position: fixed;
  height: 100vh;
  width: ${props => props.width}px;
  display: ${props => props.display};
  flex-direction: column;
  align-items: start;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 64px;
  padding-top: 64px;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  border-right: 1px solid #ccc;

  transition: all 0.3s;
  
  .expand-sidebar-icon {
    margin: 16px 0;
    cursor: pointer;
    color: #4C68EF;
  }


`

