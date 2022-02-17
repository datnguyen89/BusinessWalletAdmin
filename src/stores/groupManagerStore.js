import { action, autorun, observable } from 'mobx'
import { GroupManagerRequest } from '../requests/groupManagerRequest'

class GroupManagerStore {

  constructor() {
    autorun(() => {
      this.listGroupIdByUser = this.listGroupByUser.map(item => item.GroupId)
      this.resetFilterObj.PageSize = this.filterObj.PageSize
    })
  }

  @observable listGroups = []

  @action getListGroups = () => {
    return new Promise((resolve, reject) => {
      GroupManagerRequest.getListGroups()
        .then(response => {
          if (!response.data.Error) {
            this.listGroups = response.data.Data
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @observable listGroupsPaging = []

  @observable filterObj = {
    Name : '',
    ClientType : '',
    PageIndex: 1,
    PageSize: 10,
  }
  @observable resetFilterObj = {
    Name : '',
    ClientType : '',
    PageIndex: 1,
    PageSize: 10,
  }
  @action setFilterObj = e => {
    this.filterObj = e
  }
  @observable totalCountGroupsPaging = 0
  @action getListGroupsPaging = () => {
    return new Promise((resolve, reject) => {
      GroupManagerRequest.getListGroupsPaging(this.filterObj)
        .then(response => {
          if (!response.data.Error) {
            this.listGroupsPaging = response.data.Data.Data
            this.totalCountGroupsPaging = response.data.Data.TotalData
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action addGroup = (payload) => {
    return new Promise((resolve, reject) => {
      GroupManagerRequest.addGroup(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @observable listGroupByUser = []
  @observable listGroupIdByUser = []
  @action getGroupByUser = (payload) => {
    return new Promise((resolve, reject) => {
      GroupManagerRequest.getGroupByUser(payload)
        .then(response => {
          if (!response.data.Error) {
            this.listGroupByUser = response.data.Data
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action updateGroupForUser = (payload) => {
    return new Promise((resolve, reject) => {
      GroupManagerRequest.updateGroupForUser(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
}

export default new GroupManagerStore()
