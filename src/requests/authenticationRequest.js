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

  changePassword: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/ChangePasswordForAdminCMS`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload
    })
  },
}
