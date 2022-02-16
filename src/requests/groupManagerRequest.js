import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'

const source = axios.CancelToken.source()

export const GroupManagerRequest = {
  cancelRequest: () => {
    source.cancel()
  },
  getListGroups: () => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetClientType`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
    })
  },
}
