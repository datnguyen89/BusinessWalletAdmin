import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { GlobalStyle } from './ThemeProviderStyled'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive/src'
import { DEVICE } from '../../utils/constant'
import viVN from 'antd/es/locale/vi_VN'
import { ConfigProvider } from 'antd'

const ThemeProvider = props => {
  const { commonStore, children } = props

  const { i18n } = useTranslation()

  const isDesktop = useMediaQuery({ minWidth: 1024 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  useEffect(() => {
    i18n.changeLanguage(commonStore.appLanguage)
  }, [commonStore.appLanguage])

  useEffect(() => {
    if (!isDesktop) return
    commonStore.setDevice(DEVICE.DESKTOP)
  }, [isDesktop])
  useEffect(() => {
    if (!isTablet) return
    commonStore.setDevice(DEVICE.TABLET)
  }, [isTablet])
  useEffect(() => {
    if (!isMobile) return
    commonStore.setDevice(DEVICE.MOBILE)
  }, [isMobile])

  return (
    <ConfigProvider locale={viVN}>
      <GlobalStyle
        theme={commonStore.appTheme}
      />
      {children}
    </ConfigProvider>
  )
}

export default inject('commonStore')(observer(ThemeProvider))
