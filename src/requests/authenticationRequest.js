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
      url: `${apiUrl}/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { UserName: payload.UserName, Password: payload.Password, ClientId: payload.ClientId },
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
