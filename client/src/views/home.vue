<template>
  <div class="main-box">
    <div class="top">
      <el-carousel trigger="click" height="300px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <div class="saying">
        <p>别人笑我太疯癫，我笑别人看不出穿</p>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <h3>文章推荐</h3>
        <ul>
          <li v-for="item in 6" :key="item">
            <div class="article-img">
              <img src="../static/img/avater.jpg" alt="">
            </div>
            <div class="article-content">
              <h4>大型网站SEO优化技巧</h4>
              <p class="content-text">说到网站被劫持，很多站长并不陌生，可如何才能有效发现并避免被劫持，是很多网站头疼的问题，小彪特别整理了资料，为大家分享网站被劫持解决方案。 一、什么是网站劫持 网站...</p>
              <div class="bottom">
                <span>日期：2019-01-30</span>
                <span>浏览：171次</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="hot">
          <h4>热门文章</h4>
          <ul>
            <li v-for="item in 5" :key="item">
              <div class="article-img">
                <img src="../static/img/avater.jpg" alt="">
              </div>
              <div class="article-content">
                <h4>大型网站SEO优化技巧</h4>
                <div class="bottom">
                  <span>日期：2019-01-30</span>
                  <span>浏览：171次</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="link">
          <h4>猜你喜欢</h4>
          <ul>
            <li v-for="item in 11" :key="item">
              <a>vue</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { test } from '../api/home'

export default {
  methods: {
    async init () {
      var data1 = await test()
      console.log(data1)
    }
  },
  mounted () {
    // this.init()
  }
}
</script>

<style lang="scss" scoped>
  @import "../static/css/base";
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .main-box {
    width: 1200px;
    .top{
      display: flex;
      .el-carousel{
        flex: 1;
      }
      .saying{
        width: 360px;
        margin-left: 15px;
        background-image: url("../static/img/saying-bg.jpg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding: 20px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        p{
          color: $other;
          position: absolute;
          right: 30px;
          top: 100px;
          width: 200px;
          line-height: 25px;
          height: 125px;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
      }
    }
    .content{
      display: flex;
      margin-top: 25px;
      .left{
        flex: 1;
        h3{
          color: $title;
          height: 30px;
          line-height: 30px;
        }
        ul{
          margin: 15px 0 0;
          li{
            box-sizing: border-box;
            display: flex;
            border: 1px solid #bebebe;
            padding: 15px;
            border-radius: 4px;
            transition: all .3ms;
            &:hover{
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
            }
            &:not(:last-child){
              margin-bottom: 15px;
            }
            .article-img{
              width: 120px;
              height: 120px;
              overflow: hidden;
              img{
                width: 100%;
                display: block;
              }
            }
            .article-content{
              flex: 1;
              margin-left: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              h4{
                color: $title;
                line-height: 30px;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
              .content-text{
                color: $text;
                line-height: 25px;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                font-size: 14px;
                text-indent: 2em;
              }
              .bottom{
                display: flex;
                justify-content: flex-end;
                span{
                  font-size: 12px;
                  color: $other;
                  display: block;
                  height: 25px;
                  line-height: 25px;
                  margin-left: 30px;
                }
              }
            }
          }
        }
      }
      .right{
        width: 300px;
        margin-left: 15px;
        .hot{
          padding: 10px;
          border: 1px solid #bebebe;
          border-radius: 4px;
          h3{
            color: $title;
            height: 30px;
            line-height: 30px;
          }
          ul{
            margin: 15px 0 0;
            li{
              box-sizing: border-box;
              display: flex;
              &:not(:last-child){
                margin-bottom: 15px;
              }
              .article-img{
                width: 60px;
                height: 60px;
                overflow: hidden;
                img{
                  width: 100%;
                  display: block;
                }
              }
              .article-content{
                flex: 1;
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                h4{
                  color: $title;
                  line-height: 20px;
                  font-size: 14px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                .bottom{
                  display: flex;
                  span{
                    font-size: 12px;
                    color: $other;
                    display: block;
                    height: 25px;
                    line-height: 25px;
                    margin-right: 15px;
                  }
                }
              }
            }
          }
        }
        .link{
          padding: 10px;
          border: 1px solid #bebebe;
          border-radius: 4px;
          margin-top: 10px;
          h3{
            color: $title;
            height: 30px;
            line-height: 30px;
          }
          ul{
            margin: 10px 0 0;
            display: flex;
            flex-wrap: wrap;
            li{
              margin: 5px;
              a{
                height: 24px;
                line-height: 12px;
                box-sizing: border-box;
                display: block;
                border: 1px solid #bebebe;
                border-radius: 12px;
                padding: 5px 10px;
                font-size: 12px;
                color: $other;
                &:hover{
                  color: $active-text;
                  border: 1px solid $active-border;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
