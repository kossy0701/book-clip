<template>
  <div id="form">
    <BcBookInfo :book="book"></BcBookInfo>
    <hr />
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="読了日">
        <el-date-picker type="date" v-model="form.read"></el-date-picker>
      </el-form-item>
      <el-form-item label="感想" prop="memo">
        <el-input type="textarea" size="large" v-model="form.memo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsubmit">登録</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BcBookInfo from '@/components/BcBookInfo.vue'
import { Book } from '@/api'

export default {
  name: 'BcBookForm',
  components: {
    BcBookInfo
  },
  data() {
    return {
      book: {},
      form: {
        read: new Date(),
        memo: ''
      },
      rules: {
        memo: [
          { required: true, message: 'メモが未入力です。', trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapGetters([ 'currentBook', 'getBookById' ]),

  created() {
    if (!this.currentBook) {
      this.$router.push('/')
    }
    this.book = Object.assign({}, this.currentBook)
  },

  mounted() {
    let b = this.getBookById(this.book.id)
    if (b) {
      this.form.read = b.read
      this.form.memo = b.memo
    }
  },

  methods: {
    onsubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          Book.createBook(Object.assign(this.book, this.form))
            .then(() => {
              this.$store.dispatch('updateCurrentBook', null)
              this.$notify({
                title: 'MitsuKaru',
                message: this.$createElement('p', { style: 'color: #009' },
                  '読書情報の登録／更新に成功しました。'),
                duration: 2000
              })
              this.form.read = new Date()
              this.form.memo = ''
              this.$router.push('/')
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
      })
    }
  }
}
</script>

<style scoped>
#form {
  margin-top: 15px;
}
</style>
