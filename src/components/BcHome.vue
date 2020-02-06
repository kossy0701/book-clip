<template>
  <div class="list">
    <p>{{ bookCount }}件の読書情報が記録されています。</p>
    <BcBookInfo v-for="(b, i) of books" :linkable="true" :book="b" :index="i + 1" :key="b.isbn">
    </BcBookInfo>
    <div>
      <!-- <el-pagination background layout="prev, pager, next" :total="bookCount" :page-size="3" @current-change="onchange">
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Book } from '@/api'
import BcBookInfo from '@/components/BcBookInfo.vue'

export default {
  name: 'MkHome',
  data() {
    return {
      books: []
    }
  },
  components: {
    BcBookInfo
  },
  computed: mapGetters([ 'bookCount', 'getRangeByPage' ]),

  // methods: {
  //   onchange(page) {
  //     this.books = this.getRangeByPage(page)
  //   }
  // },

  created() {
    Book.getCurrentUserBooks(this.$store.state.currentUser)
      .then((res => {
          this.books = []
          for (let b of res) {
            this.books.push({
              title: b.title,
              authors: b.authors,
              price: b.price ? b.price : '-',
              publisher: b.publisher,
              published_date: b.published_date,
              image_path: b.image_path ? b.image_path : '',
            })
          }
      }))
  }
}
</script>
