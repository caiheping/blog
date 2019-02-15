<template>
  <div class="sayDetail" v-if="sayData">
    <h3>说说内容</h3>
    <div class="content">
      <img :src="sayData.User.avator" alt="">
      <div>
        <h4>{{sayData.content}}</h4>
        <p>{{sayData.createdAt}} · {{sayData.User.username}} 发起</p>
      </div>
    </div>
    <el-button type="primary" size="small" @click="dialogFormVisible = true">发表评论</el-button>
    <el-dialog title="发表评论" :visible.sync="dialogFormVisible">
      <el-form :model="commentForm" :rules="rules" ref="commentForm" label-width="100px">
        <el-form-item label="主要内容" prop="content">
          <el-input type="textarea" v-model="commentForm.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('commentForm')">提交</el-button>
          <el-button @click="resetForm('commentForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <h3>说说评论</h3>
    <ul class="comments" v-if="sayData.Comments.length > 0">
      <li v-for="item in sayData.Comments" :key="item.id">
        <div class="user">
          <div>
            <img :src="item.User.avator" alt="">
            <span>{{item.User.username}}</span>
          </div>
          <p class="time">
            评论时间：
            <span>{{item.createdAt}}</span>
          </p>
        </div>
        <p class="text">{{item.content}}</p>
      </li>
    </ul>
    <p v-else class="noDatas">暂无评论</p>
  </div>
</template>

<script>
import { getSayDetailApi, addCommentApi } from '../api/sayDetail'
export default {
  data () {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
      sayData: null,
      dialogFormVisible: false,
      commentForm: {
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
          this.commentForm.userId = JSON.parse(localStorage.getItem('userInfo')).userId
          this.commentForm.sayId = this.$route.params.sayId
          addCommentApi(this.commentForm).then(res => {
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
    async init () {
      let { data } = await getSayDetailApi({
        sayId: this.$route.params.sayId
      })
      this.sayData = data
      console.log(this.sayData)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  @import "../static/css/base";
  .sayDetail{
    padding: 20px;
    width: 1200px;
    margin: 0 auto;
    h3{
      height: 30px;
      line-height: 30px;
    }
    .content{
      width: 100%;
      display: flex;
      padding: 10px;
      border: 1px solid $border;
      border-radius: 4px;
      &:not(:last-child){
        margin-bottom: 15px;
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
    .comments{
      li{
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
        border: 1px solid $border;
        border-radius: 4px;
        &:not(:last-child){
          margin-bottom: 15px;
        }
        .user{
          display: flex;
          justify-content: space-between;
          div{
            display: flex;
            img{
              display: block;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-right: 10px;
            }
            span{
              color: $text;
              height: 30px;
              line-height: 30px;
            }
            .time{
              color: $text;
              height: 30px;
              line-height: 30px;
            }
          }
        }
        .text{
          margin: 10px 0;
          text-indent: 2em;
        }
      }
    }
    .noDatas{
      text-align: center;
      padding: 30px 0;
      color: $text;
    }
  }
</style>
