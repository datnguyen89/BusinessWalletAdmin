import React, { useEffect } from 'react'
import { deviceDetect } from 'react-device-detect'
import { apiUrl } from './config'
//antd
import { message } from 'antd'
// Encrypt
import cypherUtil from './utils/cypherUtil'
// Axios
import axios from 'axios'
// ip
const publicIp = require('public-ip')
// Styling
import './App.less'
import ThemeProvider from './providers/ThemeProvider'
import 'antd/es/modal/style'
import 'antd/es/slider/style'
// React Router
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
// MobX
import { Provider } from 'mobx-react'
import commonStore from './stores/commonStore.js'
import authenticationStore from './stores/authenticationStore.js'
import userManagerStore from './stores/userManagerStore.js'
import testStore from './stores/testStore.js'
import appSettingStore from './stores/appSettingStore.js'
import groupManagerStore from './stores/groupManagerStore.js'

//moment
import moment from 'moment'
import 'moment/locale/vi'
import { PAGES, PRIVATE_KEY, PUBLIC_KEY } from './utils/constant'
// Pages
import HomePage from './pages/WebApp/HomePage'
import LoginPage from './pages/WebApp/LoginPage'
import NotPermissionPage from './pages/WebApp/NotPermissionPage'
import NotFoundPage from './pages/WebApp/NotFoundPage'
import TestPage from './pages/WebApp/TestPage'
import UserManagerPage from './pages/WebApp/UserManagerPage'
import GroupManagerPage from './pages/WebApp/GroupManagerPage'
import stringUtils from './utils/stringUtils'


const history = createBrowserHistory()

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !localStorage.getItem('jwt') ? (
        <Redirect
          to={{
            pathname: PAGES.LOGIN.PATH,
            state: { from: props.location },
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
)

moment.updateLocale('vi', {
  week: {
    dow: 1,
  },
})

const rootStores = {
  commonStore,
  authenticationStore,
  userManagerStore,
  testStore,
  appSettingStore,
  groupManagerStore,
}

// axios.defaults.timeout = 20000
axios.interceptors.request.use(
  config => {
    if (config.disableSpinner) {
      commonStore.setAppLoading(false)
    } else {
      commonStore.setAppLoading(true)
    }
    console.log('REQUEST',config.url.replace(apiUrl,''), config.data)
    let k = stringUtils.randomId(16)
    let obj = { key: k, iv: k }
    let strDataKey = JSON.stringify(obj)
    let strData = JSON.stringify({ ...config.data })

    let encryptedDataKey = cypherUtil.rsaEncrypt(strDataKey)
    let encryptedData = cypherUtil.aesEncrypt(strData, k, k)
    config.data = { data: encryptedData, objKey: encryptedDataKey }
    return config
  },
  error => {
    commonStore.setAppLoading(false)
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  response => {
    commonStore.setAppLoading(false)
    console.log('RESPONSE',response.config.url.replace(apiUrl,''), response)
    if (response.data.Error) {
      message.error(response.data.Message)
    }
    return response
  },
  error => {
    commonStore.setAppLoading(false)
    // if (error?.response?.status === 403) {
    //   // TODO: do something
    // }
    return Promise.reject(error)
  },
)

const App = () => {

  // (async () => {
  //   console.log(await publicIp.v4())
  // })()
  // useEffect(() => {
  //   console.log(deviceDetect())
  // }, [])

  return (
    <Provider {...rootStores}>
      <ThemeProvider>
        <Router history={history}>
          <Switch>
            <Route exact path={PAGES.LOGIN.PATH} component={LoginPage} /> {/*Đăng nhập*/}
            <ProtectedRoute exact path={PAGES.HOME.PATH} component={HomePage} />

            <ProtectedRoute exact path={PAGES.USER_MANAGER.PATH} component={UserManagerPage} />
            <ProtectedRoute exact path={PAGES.GROUP_MANAGER.PATH} component={GroupManagerPage} />

            <Route exact path={PAGES.TEST.PATH} component={TestPage} />
            <Route exact path={PAGES.NOT_PERMISSION.PATH} component={NotPermissionPage} /> {/*Không có quyền truy cập*/}
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App
