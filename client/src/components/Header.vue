<template>
  <div class="header">
    <div class="header-box">
      <ul>
        <router-link to="/layout/home" tag="li">首页</router-link>
        <router-link to="/layout/article" tag="li">精品文章</router-link>
        <router-link to="/layout/forum" tag="li">技术论坛</router-link>
        <router-link to="/layout/allSays" tag="li">全部说说</router-link>
        <router-link :to="'/layout/mySays/'+userInfo.userId" tag="li">我的说说</router-link>
        <router-link to="/layout/questions" tag="li">我的疑问</router-link>
      </ul>
      <div class="right">
        <span v-if="userInfo.username">欢迎您：{{userInfo.username}}</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <img :src="userInfo.avator" alt="">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginOut">注销</el-dropdown-item>
            <el-dropdown-item command="a">设置</el-dropdown-item>
            <el-dropdown-item command="a">消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'loginOut') {
        this.$router.replace('/login')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../static/css/base";
  .router-link-active {
    color: $active-text;
    font-weight: bold;
    &:after{
      content: '';
      width: 100%;
      height: 5px;
      background: rgba(0,0,0,0.2);
      border-radius: 50%;
      position: absolute;
      bottom: 5px;
      left: 0;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 14px;
  }

  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    box-shadow: 0 4px 6px #ccc;
    z-index: 999;
    background: #fff;
    display: flex;
    justify-content: center;
    .header-box {
      width: 1200px;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      ul {
        display: flex;
        li {
          padding: 0 5px;
          margin: 0 10px;
          cursor: pointer;
          position: relative;
          &:hover{
            color: $active-text;
            font-weight: bold;
            &:after{
              content: '';
              width: 100%;
              height: 5px;
              background: rgba(0,0,0,0.2);
              border-radius: 50%;
              position: absolute;
              bottom: 5px;
              left: 0;
            }
          }
        }
      }
      .right {
        display: flex;
        span {
          height: 50px;
          line-height: 50px;
          padding: 0 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: $text;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
