import React, { useState } from 'react'
import PropTypes, { oneOf } from 'prop-types'
import { Button, message, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { CloudUploadOutlined } from '@ant-design/icons'
import { UploadModuleWrapper } from './UploadModuleStyled'

const UploadModule = props => {
  const {
    callbackFileCropped,
    callbackFileSrcPreview,
    uploadButton,
  } = props

  const [fileCropped, setFileCropped] = useState(null)
  const [fileSrcCropped, setFileSrcCropped] = useState(null)

  const handleBeforeUpload = (file) => {
    if (file) {

      const acceptType = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/pdf'
      ]
      let isAcceptType = acceptType.includes(file.type)
      if (!isAcceptType) {
        message.error('Vui lòng chọn file định dạng jpg/jpeg/png/pdf')
        return
      }
      if (file.size > 5242880) {
        message.error('Dung lượng ảnh phải nhỏ hơn 5MB')
        return
      }

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
    <UploadModuleWrapper>
      <Upload
        beforeUpload={handleBeforeUpload}
      >
        {uploadButton ? uploadButton : <CloudUploadOutlined />}
      </Upload>
    </UploadModuleWrapper>
  )
}

UploadModule.propTypes = {
  callbackFileCropped: PropTypes.func.isRequired,
  callbackFileSrcPreview: PropTypes.func.isRequired,
  uploadButton: PropTypes.node,
}

export default UploadModule