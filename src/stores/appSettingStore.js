import { action, autorun, observable } from 'mobx'
import { AppSettingRequest } from '../requests/appSettingRequest'

class AppSettingStore {

  @observable clientTypes = []

  @action getClientType = () => {
    return new Promise((resolve, reject) => {
      AppSettingRequest.getClientType()
        .then(response => {
          if (!response.data.Error) {
            this.clientTypes = response.data.Data
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }


}

export default new AppSettingStore()
