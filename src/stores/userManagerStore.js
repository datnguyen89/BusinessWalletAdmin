import { action, autorun, observable } from 'mobx'
import { UserManagerRequest } from '../requests/userManagerRequest'
import moment from 'moment'

class UserManagerStore {

  constructor() {
    autorun(() => {
      this.resetFilterObj.PageSize = this.filterObj.PageSize
    })
  }

  @action registerUser = (payload) => {
    return new Promise((resolve, reject) => {
      UserManagerRequest.registerUser(payload)
        .then(response => {
          resolve(response.data)
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
  @observable resetFilterObj = {
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
  @observable totalCountUsers = 0

  @action getListUsers = () => {
    return new Promise((resolve, reject) => {
      UserManagerRequest.getListUsers(this.filterObj)
        .then(response => {
          if (response.data.Data) {
            this.listUsers = response.data.Data.Data
            this.totalCountUsers = response.data.Data.TotalData
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @observable selectingUser = null
  @action getUserById = (payload) => {
    return new Promise((resolve, reject) => {
      UserManagerRequest.getUserById(payload)
        .then(response => {
          this.selectingUser = response.data.Data
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action updateInfoUser = (payload) => {
    return new Promise((resolve, reject) => {
      UserManagerRequest.updateInfoUser(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action resetPassword = (payload) => {
    return new Promise((resolve, reject) => {
      UserManagerRequest.resetPassword(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
}

export default new UserManagerStore()
