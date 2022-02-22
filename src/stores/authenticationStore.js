import { action, autorun, observable } from 'mobx'
import { AuthenticationRequest } from '../requests/authenticationRequest'

class AuthenticationStore {
  constructor() {
    autorun(() => {
      this.jwtDecode = this.accessToken ? JSON.parse(atob(this.accessToken?.split('.')[1])) : {}
    })
  }

  @observable accessToken = localStorage.getItem('jwt') || undefined
  @observable jwtDecode = null

  @action userLogin = (payload) => {
    return new Promise((resolve, reject) => {
      AuthenticationRequest.userLogin(payload)
        .then(response => {
          if (!response.data.Error) {
            const tokenData = response.data?.data.token
            localStorage.setItem('jwt', tokenData)
            this.accessToken = tokenData
          } else {
            if (response.data.ResponseCode === -52) {
              console.log('Nhập OTP')
            }
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
   @action changePassword = (payload) => {
    return new Promise((resolve, reject) => {
      AuthenticationRequest.changePassword(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action userLogout = () => {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('jwt')
      resolve()
    })
  }

}

export default new AuthenticationStore()
