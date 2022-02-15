import { action, autorun, observable } from 'mobx'
import { UserManagerRequest } from '../requests/userManagerRequest'

class UserManagerStore {
  @action registerUser = (payload) => {
    return new Promise((resolve, reject) => {
      UserManagerRequest.registerUser(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  }
  @observable filterPayLoad = {
    CreatedDateFrom: null,
    CreatedDateTo: null,
    FullName: null,
    UserName: null,
    ActiveStatus: true,
    PageIndex: 1,
    PageSize: 10,
  }
  @observable setFilterPayLoad = (payload) => {
    this.filterPayLoad = payload
  }
  @action getListUsers = (payload) => {
    return new Promise((resolve, reject) => {
      UserManagerRequest.getListUsers(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  }
}

export default new UserManagerStore()
