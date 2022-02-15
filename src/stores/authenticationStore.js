import { action, autorun, observable } from 'mobx'
import { AuthenticationRequest } from '../requests/authenticationRequest'

class AuthenticationStore {

  @observable accessToken = localStorage.getItem('jwt') || undefined  

  @action userLogin = (payload) => {
    return new Promise((resolve, reject) => {
      AuthenticationRequest.userLogin(payload)
        .then(response => {
          if (!response.data.Error) {
            const tokenData = response.data.Data.Token
            localStorage.setItem('jwt', tokenData)
            this.accessToken = tokenData
          }
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
