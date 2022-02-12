import { action, autorun, observable } from 'mobx'
import { UserManagerRequest } from '../requests/userManagerRequest'

class UserManagerStore {
  @action registerUser = (payload) => {
    return new Promise((resolve, reject) => {
      UserManagerRequest.registerUser(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  } 

}

export default new UserManagerStore()
