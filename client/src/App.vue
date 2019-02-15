<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
  @import "./static/css/base";

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }

  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }

  .register {
    .el-form-item__label {
      color: $other;
    }
  }

  .login {
    .el-form-item__label {
      color: $other;
    }
  }
</style>
