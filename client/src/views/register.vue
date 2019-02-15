<template>
  <div class="register">
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
      <h3>Register</h3>
      <el-form
        :model="registerForm"
        status-icon
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.number="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input type="password" v-model="registerForm.repassword" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { registerApi } from '../api/register'

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
      } else {
        if (this.registerForm.repassword !== '') {
          this.$refs.registerForm.validateField('repassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        password: '',
        repassword: '',
        username: ''
      },
      rules: {
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        repassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        username: [{ required: true, validator: checkName, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          registerApi(this.registerForm).then(res => {
            console.log(res)
            if (res.code === 0) {
              _this.$router.push('login')
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
.register{
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
    box-shadow: 0px 0 8px #bebebe;
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
  }
}
</style>
