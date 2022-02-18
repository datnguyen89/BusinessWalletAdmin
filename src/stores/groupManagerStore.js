import { action, autorun, observable } from 'mobx'
import { GroupManagerRequest } from '../requests/groupManagerRequest'

class GroupManagerStore {

  constructor() {
    autorun(() => {
      this.listGroupIdByUser = this.listGroupByUser.map(item => item.groupId)
      this.resetFilterObj.PageSize = this.filterObj.PageSize
      this.resetFilterObjUser.PageSize = this.filterObjUser.PageSize
    })
  }

  @observable listGroups = []

  @action getListGroups = () => {
    return new Promise((resolve, reject) => {
      GroupManagerRequest.getListGroups()
        .then(response => {
          if (!response.data.Error) {
            this.listGroups = response.data?.data
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @observable listGroupsPaging = []

  @observable filterObj = {
    Name: '',
    ClientType: '',
    PageIndex: 1,
    PageSize: 10,
  }
  @observable resetFilterObj = {
    Name: '',
    ClientType: '',
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
            this.listGroupsPaging = response.data?.data.data
            this.totalCountGroupsPaging = response.data?.data.totalData
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
            this.listGroupByUser = response.data?.data
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


  @observable filterObjUser = {
    CreatedDateFrom: 0,
    CreatedDateTo: 0,
    FullName: '',
    UserName: '',
    GroupId: 0,
    ActiveStatuses: [],
    PageIndex: 1,
    PageSize: 10,
  }
  @observable resetFilterObjUser = {
    CreatedDateFrom: 0,
    CreatedDateTo: 0,
    FullName: '',
    UserName: '',
    GroupId: 0,
    ActiveStatuses: [],
    PageIndex: 1,
    PageSize: 10,
  }
  @action setFilterObjUser = e => {
    this.filterObjUser = e
  }
  @observable listUsersInGroup = []
  @observable totalCountUsersInGroup = 0
  @action getListUsersInGroup = () => {
    return new Promise((resolve, reject) => {
      GroupManagerRequest.getListUsersInGroup(this.filterObjUser)
        .then(response => {
          if (!response.data.Error) {
            this.listUsersInGroup = response.data?.data.data
            this.totalCountUsersInGroup = response.data?.data.totalData
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @observable selectingGroup = null
  @action getGroupById = (payload) => {
    return new Promise((resolve, reject) => {
      GroupManagerRequest.getGroupById(payload)
        .then(response => {
          this.selectingGroup = response.data?.data
          resolve(response.data?.data)
        })
        .catch(error => reject(error))
    })
  }
  @action updateGroup = (payload) => {
    return new Promise((resolve, reject) => {
      GroupManagerRequest.updateGroup(payload)
        .then(response => {
          resolve(response.data?.data)
        })
        .catch(error => reject(error))
    })
  }
  @action removeUserFromGroup = (payload) => {
    return new Promise((resolve, reject) => {
      GroupManagerRequest.removeUserFromGroup(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action searchUserNotInGroupByKeyword = (payload) => {
    return new Promise((resolve, reject) => {
      GroupManagerRequest.searchUserNotInGroupByKeyword(payload)
        .then(response => {
          resolve(response.data?.data)
        })
        .catch(error => reject(error))
    })
  }
  @action updateUserForGroup = (payload) => {
    return new Promise((resolve, reject) => {
      GroupManagerRequest.updateUserForGroup(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

}

export default new GroupManagerStore()
