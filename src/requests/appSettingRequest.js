import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'

const source = axios.CancelToken.source()

export const AppSettingRequest = {
  cancelRequest: () => {
    source.cancel()
  },
  getClientType: () => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetClientType`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
    })
  },
  getListStatusUser: () => {
    return axios({
      method: 'get',
      url: `${apiUrl}/GetStatusUser`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
    })
  },


}
