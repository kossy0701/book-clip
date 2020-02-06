<template>
  <div id="app">
    <h2>MitsuKaru</h2>
    <el-menu mode="horizontal" background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b" v-if='this.$store.getters.userName'>
      <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/search">Search</router-link></el-menu-item>
      <el-submenu index="3">
        <template v-slot:title>Support</template>
        <el-menu-item index="3-1"><a href="https://github.com/kossy0701/mitsukaru" target="help">Author</a>
        </el-menu-item>
        <el-menu-item index="3-2"><a href="https://kossy-web-engineer.hatenablog.com" target="help">Publisher</a>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="4">{{$store.state.currentUser.id}}</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}

</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 800px;
  margin: 0 auto;
  color: #2c3e50;
  margin-top: 60px;
}

#app h2 {
  color: #009;
}

#nav {
  margin-bottom: 15px;
}

.el-menu-item a {
  color: #fff;
}
</style>
