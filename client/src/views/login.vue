<template>
  <div class="login">
    <div class="bg">
      <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    </div>
    <div class="main">
      <h3>Login</h3>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.number="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="bottom">
        <router-link to="register">没有账号？去注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { loginApi } from '../api/login'

export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    return {
      loginForm: {
        password: '',
        username: ''
      },
      rules: {
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        username: [{ required: true, validator: checkName, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async submitForm (formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        console.log(valid)
        if (valid) {
          loginApi(this.loginForm).then(res => {
            if (res.code === 0) {
              localStorage.setItem('token', res.token)
              let userInfo = {
                username: res.data.username,
                userId: res.data.id,
                avator: res.data.avator
              }
              localStorage.setItem('userInfo', JSON.stringify(userInfo))
              _this.$router.push('/layout/home')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw);
  height: calc(100vh);
  background: url("../static/img/login-bg.jpg") no-repeat;
  background-size: 100%;
  .bg{
    position: fixed;
    height: calc(100vh);
    width: calc(100vw);
    div{
      width: 100%;
      height: 100%;
    }
  }
  .main{
    width: 500px;
    overflow: hidden;
    box-shadow: 0px 0 10px #bebebe;
    box-sizing: border-box;
    padding: 10px 15px;
    border-radius: 4px;
    background: rgba(0,0,0,.6);
    z-index: 999;
    h3{
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      margin-bottom: 10px;
      text-align: center;
      color: #ccc;
    }
    .bottom{
      display: flex;
      justify-content: flex-end;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      a{
        color: #f56c6c;
        cursor: pointer;
      }
    }
  }
}
</style>
