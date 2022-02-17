import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'

const source = axios.CancelToken.source()

export const UserManagerRequest = {
  cancelRequest: () => {
    source.cancel()
  },
  registerUser: (payload) => {
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
  getListUsers: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetUsers`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  getUserById: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetUserById`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  updateInfoUser: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/UpdateUser`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  resetPassword: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/ResetPassword`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  updateRoleUser: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/UpdateRoleUser`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },

  getTreeRoles: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetTreeRoles`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },


}
