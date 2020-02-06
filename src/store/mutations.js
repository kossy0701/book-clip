import * as types from './mutation-types'

export default {
  [types.AUTH_LOGIN] (state, payload) {
    state.auth = payload
  },

  [types.AUTH_LOGOUT] (state) {
    state.auth = {
      accessToken: null,
      client: null,
      expiry: null,
      uid: null
    }
  },

  [types.AUTH_SIGNUP] (state, payload) {
    state.auth = payload
  },

  [types.SET_CURRENT_USER] (state, payload) {
    state.currentUser = payload
  },

  [types.SET_TWO_STEP_AUTH] (state, payload) {
    state.twoStepAuth = payload
  },

  [types.UPDATE_CURRENT_BOOK] (state, payload) {
    state.currentBook = payload
  },

  [types.UPDATE_BOOK] (state, payload) {
    let b = this.getters.getBookById(payload.id)
    if (b) {
      Object.assign(b, payload)
    } else {
      state.books.push(payload)
    }
  }
}
