import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'
const source = axios.CancelToken.source()
export const commonRequest = {
    cancelRequest: () => {
      source.cancel()
    },
  
    deleteSizeCache: () => {
      return axios({
        method: 'post',
        url: `${apiUrl}/api/nodes/delete-size-cache`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authenticationStore.accessToken}`,
        },
      })
    },
  }