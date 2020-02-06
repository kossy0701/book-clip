export default {
  authHeaders: state => {
    return {
      'access-token': state.auth.accessToken,
      client: state.auth.client,
      expiry: state.auth.expiry,
      uid: state.auth.uid
    }
  },

  userName: state => {
    if (state.currentUser && state.currentUser.name) {
      return state.currentUser.name
    }
  },

  bookCount (state) {
    return state.books.length
  },

  allBooks (state) {
    return state.books
  },

  getRangeByPage (state) {
    return page => {
      const SIZE = 3
      return state.books.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE)
    }
  },

  getBookById (state) {
    return id => {
      return state.books.find(book => book.id === id)
    }
  },

  currentBook (state) {
    return state.currentBook
  }
}