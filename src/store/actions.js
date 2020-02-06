import * as types from './mutation-types'
import { Auth } from '../api'

export default {
  login: ({ commit }, authInfo) => {
    return Auth.login(authInfo)
      .then(({ auth, currentUser, twoStepAuth }) => {
        commit(types.AUTH_LOGIN, auth)
        localStorage.accessToken = auth.accessToken
        localStorage.client = auth.client
        localStorage.expiry = auth.expiry
        localStorage.uid = auth.uid
        commit(types.SET_CURRENT_USER, currentUser)
        commit(types.SET_TWO_STEP_AUTH, twoStepAuth)
      })
      .catch(err => { throw err })
  },

  twoStepVerify: ({ commit }, authInfo) => {
    return Auth.twoStepVerify(authInfo)
      .then(({ auth, currentUser }) => {
        commit(types.AUTH_LOGIN, auth)
        localStorage.accessToken = auth.accessToken
        localStorage.client = auth.client
        localStorage.expiry = auth.expiry
        localStorage.uid = auth.uid
        commit(types.SET_CURRENT_USER, currentUser)
      })
  },

  logout: ({ commit }) => {
    return Auth.logout()
      .then(() => {
        commit(types.AUTH_LOGOUT)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('client')
        localStorage.removeItem('expiry')
        localStorage.removeItem('uid')
        commit(types.SET_CURRENT_USER, null)
      })
      .catch(err => { throw err })
  },

  signUp: ({ commit }) => {
    return Auth.signUp()
      .then((auth, currentUser) => {
        commit(types.AUTH_SIGNUP)
        localStorage.accessToken = auth.accessToken
        localStorage.client = auth.client
        localStorage.expiry = auth.expiry
        localStorage.uid = auth.uid
        commit(types.SET_CURRENT_USER, currentUser)
      })
      .catch(err => { throw err })
  },

  setCurrentUser: ({ commit }, currentUser) => {
    commit(types.SET_CURRENT_USER, currentUser)
  },

  updateCurrentBook: ({ commit }, currentBook) => {
    commit(types.UPDATE_CURRENT_BOOK, currentBook)
  },

  updateBook: ({ commit }, updateBook) => {
    commit(types.UPDATE_BOOK, updateBook)
  }
}
