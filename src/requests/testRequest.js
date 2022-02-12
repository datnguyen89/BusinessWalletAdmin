import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'

const source = axios.CancelToken.source()

export const TestRequest = {
  cancelRequest: () => {
    source.cancel()
  },
  testRq: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/register`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },

}
