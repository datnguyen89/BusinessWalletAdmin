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
      method: 'get',
      url: `${apiUrl}/ListGroup`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
    })
  },
  getListGroupsPaging: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/ListGroupPagination`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  addGroup: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/AddGroup`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  getGroupByUser: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetGroupByUser`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  updateGroupForUser: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/UpdateGroupForUser`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  getListUsersInGroup: (payload) => {
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
  getGroupById: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetGroupById`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  updateGroup: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/UpdateGroup`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  removeUserFromGroup: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/RemoveUserFromGroup`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  searchUserNotInGroupByKeyword: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/SearchUserByKeyword`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  updateUserForGroup: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/UpdateUserForGroup`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  getTreeRolesForGroup: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetTreeRolesForGroup`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },
  updateRoleGroup: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/UpdateRoleGroup`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
      },
      data: payload,
    })
  },

}
