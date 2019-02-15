<template>
  <div class="main-box">
    <h3>全部说说</h3>
    <ul v-if="sayDatas.length">
      <li v-for="(item, index) of sayDatas" :key="index" @click="sayDetali(item.id)">
        <img :src="item.User.avator" alt="">
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
import { say } from '../api/allSays'

export default {
  data () {
    return {
      sayDatas: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
      this.init()
    },
    sayDetali (id) {
      this.$router.push(`/sayDetail/${id}`)
    },
    async init () {
      let { data } = await say({
        currentPage: this.currentPage,
        pageSize: this.pageSize
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
    h3{
      line-height: 30px;
    }
    .noDatas{
      text-align: center;
      padding: 30px 0;
      color: $text;
    }
    ul{
      margin: 15px 0;
      li{
        cursor: pointer;
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
    }
    .page{
      text-align: center;
    }
  }
</style>
