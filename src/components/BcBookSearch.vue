<template>
  <div id="search">
    <el-form :inline="true">
      <el-form-item label="キーワード">
        <el-input type="text" size="large" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onclick">検索</el-button>
      </el-form-item>
    </el-form>
    <hr />
    <BcBookInfo v-for="(b, i) of books"
      :linkable="true" :book="b" :index="i + 1" :key="b.isbn"></BcBookInfo>
  </div>
</template>

<script>
import BcBookInfo from '@/components/BcBookInfo.vue'
import { Book } from '@/api'

export default {
  name: 'BcBookSearch',
  components: {
    BcBookInfo
  },
  data() {
    return {
      keyword: 'vuejs',
      books: []
    }
  },
  methods: {
    onclick: function() {
      Book.searchBook(this.keyword)
        .then((res) => {
          this.books = []
          for (let b of res) {
            this.books.push({
              title: b.title,
              authors: b.authors ? b.authors.join(',') : '',
              price: b.price ? b.price : '-',
              publisher: b.publisher,
              published_date: b.published_date,
              image_path: b.image_path ? b.image_path : '',
            })
          }
        })
        .catch((err) => {
          this.$notify({
            title: 'MitsuKaru',
            message: this.$createElement('p', { style: 'color: #009' },
            `${err}`),
            duration: 2000
          })
        })
    }
  }
}
</script>

<style scoped>
#search form {
  margin-top: 15px;
}
</style>
