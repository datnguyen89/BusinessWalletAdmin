const forge = require('node-forge')
const { PUBLIC_KEY, PRIVATE_KEY } = require('./constant')

const cypherUtil = {
  rsaEncrypt: str => {
    let encryptedData = ''
    try {
      const rsa = forge.pki.publicKeyFromPem(PUBLIC_KEY)
      encryptedData = window.btoa(rsa.encrypt(forge.util.encodeUtf8(str)))
    } catch (e) {
      console.log(e)
    }
    return encryptedData
  },
  rsaDecrypt: (str, privateKey) => {
    let decrypted = ''
    try {
      const rsa = forge.pki.privateKeyFromPem(privateKey)
      decrypted = forge.util.decodeUtf8(rsa.decrypt(window.atob(str)))
    } catch (e) {
      console.log(e)
    }
    return decrypted
  },
}

export default cypherUtil