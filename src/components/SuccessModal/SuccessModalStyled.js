import styled from 'styled-components'
import { Modal } from 'antd'

export const SuccessModalWrapper = styled(Modal)`

  .ant-modal-content {
    border-radius: 16px;
  }
`
export const SuccessModalTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
`
export const SuccessModalDescription = styled.h6`
  text-align: center;
  margin-bottom: 16px;
`