<template>
  <div class="layout">
    <el-scrollbar style="height: 100%;">
      <v-header></v-header>
      <div class="main" v-loading="loading">
        <transition name="router-fade" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import Header from '../components/Header'

export default {
  components: {
    'v-header': Header
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../static/css/base";
  .layout {
    height: calc(100vh);
    .main{
      display: flex;
      justify-content: center;
      margin-top: 60px;
      padding: 15px 0;
      min-height: calc(100vh - 60px);
      box-sizing: border-box;
    }
  }
</style>
