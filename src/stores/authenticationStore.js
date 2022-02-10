import { action, autorun, observable } from 'mobx'
import { AuthenticationRequest } from '../requests/authenticationRequest'

class AuthenticationStore {

  @observable accessToken = localStorage.getItem('jwt') || undefined  

  @action userLogin = (payload) => {
    return new Promise((resolve, reject) => {
      AuthenticationRequest.userLogin(payload)
        .then(response => {
          const tokenData = response.data.data.token
          localStorage.setItem('jwt', tokenData)
          this.accessToken = tokenData
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  } 

}

export default new AuthenticationStore()
