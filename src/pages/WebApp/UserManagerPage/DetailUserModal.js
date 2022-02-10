import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

const DetailUserModal = props => {
  const { userId, visible, onClose } = props
  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={() => onClose()}>
      <div>{userId}</div>
    </Modal>
  )
}

DetailUserModal.propTypes = {
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default DetailUserModal