import { action, autorun, observable } from 'mobx'
import { AppSettingRequest } from '../requests/appSettingRequest'

class AppSettingStore {

  @observable clientTypes = []

  @action getClientType = () => {
    return new Promise((resolve, reject) => {
      AppSettingRequest.getClientType()
        .then(response => {
          if (!response.data.error) {
            this.clientTypes = response.data?.data
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @observable listStatusUser = []
  @action getListStatusUser = () => {
    return new Promise((resolve, reject) => {
      AppSettingRequest.getListStatusUser()
        .then(response => {
          if (!response.data.error) {
            this.listStatusUser = response.data?.data
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @observable listClients = []
  @action getClients = () => {
    return new Promise((resolve, reject) => {
      AppSettingRequest.getClients()
        .then(response => {
          if (!response.data.error) {
            this.listClients = response.data?.data
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }


}

export default new AppSettingStore()
