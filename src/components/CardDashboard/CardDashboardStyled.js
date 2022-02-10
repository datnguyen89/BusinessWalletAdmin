import styled from 'styled-components'

export const CardDashBoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`
export const CardDashBoardTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #98a6ad;
  margin-bottom: -5px;
`
export const CardDashBoardContent = styled.div`
  color: rgb(108, 117, 125);
  font-size: 24px;
  font-weight: 700;
  margin: 8px 0;
`
export const CardDashBoardNumberWrapper = styled.div`
  display: flex;
`
export const CardDashBoardNumber = styled.span`
  color: ${props => props.color};
`
export const CardDashBoardSubText = styled.span`
  margin-left: 8px;
  color: rgb(152, 166, 173);
`