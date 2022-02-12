import { action, autorun, observable } from 'mobx'
import { TestRequest } from '../requests/testRequest'

class TestManagerStore {
  @action testRq = (payload) => {
    return new Promise((resolve, reject) => {
      TestRequest.testRq(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  } 

}

export default new TestManagerStore()
