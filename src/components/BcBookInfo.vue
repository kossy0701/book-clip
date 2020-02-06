<template>
<div class="clearfix" :class="{ linkable }" @click="onclick">
    <div class="image"><img :src="book.image_path" /></div>
    <div class="details">
      <ul>
        <li v-if="index">{{ index }}.</li>
        <li>{{book.title}}（{{ book.price }}円）</li>
        <li>{{book.authors}} 著</li>
        <li>{{book.publisher}} /刊</li>
        <li>{{book.published_date}} /発売</li>
      </ul>
    </div>
</div>
</template>

<script>

export default {
  name: 'BcBookInfo',
  props: {
    index: { type: Number },
    linkable: { type: Boolean, default: false },
    book: { type: Object }
  },
  methods: {
    onclick() {
      if (this.linkable) {
        this.$store.dispatch('updateCurrentBook', this.book)
        this.$router.push('/form')
      }
    }
  }
}
</script>

<style scoped>
.linkable:hover {
    cursor: pointer;
    background-color: #ff9;
}

.image {
  float:left;
}

.image img {
  height: 180px;
}

.details {
  float: left;
}

.details li {
  list-style-type: none;
  text-align: left;
}

.clearfix {
  width: 100%;
  margin-bottom: 10px;
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
</style>
