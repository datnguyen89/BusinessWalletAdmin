import { action, autorun, observable } from 'mobx'
import { UserManagerRequest } from '../requests/userManagerRequest'
import moment from 'moment'

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

  @observable filterObj = {
    CreatedDateFrom: 0,
    CreatedDateTo: 0,
    FullName: '',
    UserName: '',
    ActiveStatuses: [],
    PageIndex: 1,
    PageSize: 10,
  }

  @action setFilterObj = e => {
    this.filterObj = e
  }

  @observable listUsers = []

  @action getListUsers = (payload) => {
    return new Promise((resolve, reject) => {
      UserManagerRequest.getListUsers(payload)
        .then(response => {
          if (response.data.Data) {
            this.listUsers = response.data.Data.Data
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
}

export default new UserManagerStore()
