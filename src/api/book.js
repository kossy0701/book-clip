import client from './client'
import store from '../store'

export default {
  searchBook: (params) => {
    return new Promise((resolve, reject) => {
      client.post('/search', { keyword: params }, { headers: store.getters.authHeaders })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getCurrentUserBooks: (currentUser) => {
    return new Promise((resolve, reject) => {
      client.get('/users/' + currentUser.id + '/books', { headers: store.getters.authHeaders })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  createBook: (params) => {
    return new Promise((resolve, reject) => {
      client.post('/books', { books: params }, { headers: store.getters.authHeaders })
        .then(res => {
          resolve(res.date)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  downloadNsReports: () => {
    return new Promise((resolve, reject) => {
      client.get('/ns_reports/download', {headers: store.getters.authHeaders})
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
