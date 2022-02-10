import React, { useState } from 'react'
import PropTypes, { oneOf } from 'prop-types'
import { Button, message, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { CloudUploadOutlined } from '@ant-design/icons'
import { UploadCropModuleWrapper } from './UploadCropModuleStyled'

const UploadCropModule = props => {
  const {
    callbackFileCropped,
    callbackFileSrcPreview,
    shape,
    uploadButton,
    modalTitle,
    grid,
    rotate,
    modalOk,
    modalCancel,
  } = props

  const [fileCropped, setFileCropped] = useState(null)
  const [fileSrcCropped, setFileSrcCropped] = useState(null)

  const handleBeforeCrop = (file) => {
    console.log(file.type)
    const acceptType = [
      'image/jpeg',
      'image/jpg',
      'image/png',
    ]
    let isAcceptType = acceptType.includes(file.type)
    if (!isAcceptType) {
      message.error('Vui lòng chọn ảnh định dạng jpg/jpeg/png')
      return false
    }
    if (file.size > 5242880) {
      message.error('Dung lượng ảnh phải nhỏ hơn 5MB')
      return false
    }
    return true
  }
  const handleBeforeUpload = (file) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      callbackFileCropped(file)
      callbackFileSrcPreview(objectUrl)
    }

    // // Handle upload
    // let uploadData = new FormData()
    // uploadData.append('file', file)
    // profileStore.updateAvatar(uploadData)
    //   .then(response => {
    //     if (response.error_code === 0) {
    //       profileStore.getMyProfile()
    //     }
    //   })
    //   .catch(error => {
    //     error?.response?.status != 401 && message.error(error.message)
    //     setFileSrcCropped(null)
    //   })
    return false
  }

  return (
    <UploadCropModuleWrapper>
      <ImgCrop
        grid={grid}
        modalTitle={modalTitle || 'Cập nhật ảnh'}
        beforeCrop={handleBeforeCrop}
        rotate={rotate}
        shape={shape || 'rect'}
        aspect={16/9}
        modalOk={modalOk || 'Xác nhận'}
        modalCancel={modalCancel || 'Hủy'}>
        <Upload
          beforeUpload={handleBeforeUpload}
        >
          {uploadButton ? uploadButton : <CloudUploadOutlined />}
        </Upload>
      </ImgCrop>
    </UploadCropModuleWrapper>
  )
}

UploadCropModule.propTypes = {
  callbackFileCropped: PropTypes.func.isRequired,
  callbackFileSrcPreview: PropTypes.func.isRequired,
  shape: oneOf(['round', 'rect']),
  uploadButton: PropTypes.node,
  modalTitle: PropTypes.node,
  grid: PropTypes.bool.isRequired,
  rotate: PropTypes.bool.isRequired,
  modalOk: PropTypes.node,
  modalCancel: PropTypes.node,
}

export default UploadCropModule