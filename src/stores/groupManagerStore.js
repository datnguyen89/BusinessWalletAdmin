import { action, autorun, observable } from 'mobx'
import { GroupManagerRequest } from '../requests/groupManagerRequest'

class GroupManagerStore {

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


}

export default new GroupManagerStore()
