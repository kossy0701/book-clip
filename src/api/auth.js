import client from './client'
import store from '../store'

export default {
  login: (authInfo) => {
    return new Promise((resolve, reject) => {
      client.post('/auth/sign_in', authInfo)
        .then(res => {
          resolve({
            auth: {
              accessToken: res.headers['access-token'],
              client: res.headers['client'],
              expiry: res.headers['expiry'],
              uid: res.headers['uid']
            },
            currentUser: (res.data && res.data.data),
            twoStepAuth: {
              status: res.data.status,
              otp_uri: res.data.uri
            }
          })
        })
        .catch(err => {
          reject((err.response && err.response.data) || {code: err.message})
        })
    })
  },

  twoStepVerify: (authInfo) => {
    return new Promise((resolve, reject) => {
      client.post('/auth/sign_in', authInfo)
        .then(res => {
          resolve({
            auth: {
              accessToken: res.headers['access-token'],
              client: res.headers['client'],
              expiry: res.headers['expiry'],
              uid: res.headers['uid']
            },
            currentUser: (res.data && res.data.data),
            twoStepAuth: {
              status: null,
              otp_uri: null
            }
          })
        })
        .catch(err => {
          reject((err.response && err.response.data) || {code: err.message})
        })
    })
  },

  logout: () => {
    return new Promise((resolve, reject) => {
      client.delete('/auth/sign_out', {headers: store.getters.authHeaders})
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject((err.response && err.response.data) || {code: err.message})
        })
    })
  },

  signUp: (authInfo) => {
    return new Promise((resolve, reject) => {
      client.post('/auth', authInfo)
        .then(res => {
          resolve({
            auth: {
              accessToken: res.headers['access-token'],
              client: res.headers['client'],
              expiry: res.headers['expiry'],
              uid: res.headers['uid']
            },
            currentUser: (res.data && res.data.data)
          })
        })
        .catch(err => {
          reject((err.response && err.response.data) || {code: err.message})
        })
    })
  },

  validateToken: () => {
    return new Promise((resolve, reject) => {
      client.get('/auth/validate_token', {headers: store.getters.authHeaders})
        .then(res => {
          resolve(res.data && res.data.data)
        })
        .catch(err => {
          reject((err.response && err.response.data) || {code: err.message})
        })
    })
  }
}

