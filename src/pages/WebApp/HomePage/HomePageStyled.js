import styled from 'styled-components'

export const HomePageWrapper = styled.div`
 padding: 32px;
  background-color: #F4F5F8;
  min-height: 100vh;
`
export const HomeWhiteBox = styled.div`
  box-shadow: 0 0 35px 0 rgb(154 161 171 / 15%);
  background-color: #fff;
  padding: 16px;
  height: ${props => props.height || '100%'};
`