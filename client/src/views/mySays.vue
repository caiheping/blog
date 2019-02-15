<template>
  <div class="main-box">
    <el-button type="primary" size="small" @click="dialogFormVisible = true">发表说说</el-button>
    <el-dialog title="发表说说" :visible.sync="dialogFormVisible">
      <el-form :model="sayForm" :rules="rules" ref="sayForm" label-width="100px" class="demo-sayForm">
        <el-form-item label="主要内容" prop="content">
          <el-input type="textarea" v-model="sayForm.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('sayForm')">提交</el-button>
          <el-button @click="resetForm('sayForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <h3>我的说说</h3>
    <ul v-if="sayDatas.length">
      <li v-for="(item, index) of sayDatas" :key="index">
        <img :src="item.User.avator" alt="">
        <i class="el-icon-close" @click="delSay(item.id)"></i>
        <div>
          <h4>{{item.content}}</h4>
          <p>{{item.createdAt}} · {{item.User.username}} 发起</p>
        </div>
      </li>
    </ul>
    <p v-else class="noDatas">暂无说说</p>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { addSayApi, getMySaysApi, delSayApi } from '../api/mySays'

export default {
  data () {
    return {
      sayDatas: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      sayForm: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请填写说说内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sayForm.userId = JSON.parse(localStorage.getItem('userInfo')).userId
          addSayApi(this.sayForm).then(res => {
            this.$refs[formName].resetFields()
            this.dialogFormVisible = false
            this.init()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async delSay (id) {
      let query = {
        id
      }
      await delSayApi(query)
      this.init()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
      this.init()
    },
    async init () {
      let { data } = await getMySaysApi({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        userId: JSON.parse(localStorage.getItem('userInfo')).userId
      })
      this.sayDatas = data.rows
      this.total = data.count
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  @import "../static/css/base";
  .main-box {
    width: 1200px;
    h2{
      line-height: 36px;
    }
    h3{
      line-height: 30px;
      margin-top: 15px;
    }
    .say-form{
      margin-top: 22px;
    }
    .noDatas{
      text-align: center;
      padding: 30px 0;
      color: $text;
    }
    ul{
      margin: 15px 0;
      li{
        position: relative;
        display: flex;
        padding: 10px;
        border: 1px solid $border;
        border-radius: 4px;
        overflow: hidden;
        align-items: center;
        &:not(:last-child){
          margin-bottom: 15px;
        }
        i{
          position: absolute;
          right: 0;
          top: 0;
          font-size: 20px;
          color: $text;
          padding: 5px;
          cursor: pointer;
          &:hover{
            color: $active-text;
          }
        }
        img{
          width: 50px;
          height: 50px;
          display: block;
          border-radius: 50%;
          margin-right: 15px;
        }
        div{
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-between;
          h4{
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 24px;
            line-height: 24px;
          }
          p{
            height: 24px;
            line-height: 24px;
            color: $text;
          }
        }
      }
    }
    .page{
      text-align: center;
    }
  }
</style>
