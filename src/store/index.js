import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  auth: {
    accessToken: localStorage.accessToken,
    client: localStorage.client,
    expiry: localStorage.expiry,
    uid: localStorage.uid
  },
  currentUser: null,
  twoStepAuth: {
    status: null,
    otp_uri: null
  },
  books: [],
  currentBook: null
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})
