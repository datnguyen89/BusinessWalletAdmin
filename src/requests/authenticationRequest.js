import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'

const source = axios.CancelToken.source()

export const AuthenticationRequest = {
  cancelRequest: () => {
    source.cancel()
  },
  userLogin: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/api/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { username: payload.username, password: payload.password },
    })
  },
  userGet: (payload) => {
    return axios({
      method: 'get',
      url: `${apiUrl}/api/auth/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      params: { username: payload.username, password: payload.password },
    })
  },
}
