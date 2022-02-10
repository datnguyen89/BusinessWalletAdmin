import styled from 'styled-components'
import { Modal } from 'antd'

export const ChangePasswordModalWrapper = styled(Modal)`
  .ant-modal-close-x {
    width: auto;
    line-height: initial;
    margin: 12px;
  }

  .ant-modal-header {
    font-weight: 500;
    padding: 12px 16px;
  }

  .ant-modal-body {
    padding: 16px;
  }

  .ant-modal-content {
    border-radius: 10px;
    overflow: hidden;
  }
  .ant-input {
    height: 53px !important;
    border-radius: 5px;
  }

  .ant-input-password {
    border-radius: 5px;
  }
`
