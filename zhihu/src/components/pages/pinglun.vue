<template>
  <div class="wrapper">
    <!-- 顶部标题 -->
    <div class="pinglun_nav toFixed">
      <div class="btn" @touchend="$router.go(-1)">
        <span class="iconfont icon-fanhui-"></span>
      </div>
      <p class="tit">{{short_length + long_length}}条点评</p>
    </div>
    <!-- 长评论内容 -->
    <!-- 没有评论 -->
    <div class="no_pinglun" v-if="long_length==0">
      <p>长评论空空如也~</p>
    </div>
    <!-- 评论内容 -->
    <div class="pinglun long_pinglun" v-if="long_length!=0">
      <h2>{{long_length}}条长评论</h2>
      <div class="pinglun_con" v-for="(item) in long_pinglun" :key="item.id">
        <div class="pic">
          <img :src="item.avatar" alt>
        </div>
        <div class="pinglun_text">
          <div class="pinglun_tit">
            <h3>{{item.author}}</h3>
            <span class="iconfont icon-zan">
              <i>{{item.likes}}</i>
            </span>
          </div>
          <p>{{item.content}}</p>
          <span>{{item.time|filterTime}}</span>
        </div>
      </div>
    </div>
    <!-- 短评论内容 -->
    <div class="pinglun">
      <h2>
        {{short_length}}条短评论
        <span
          :class="[toggle==true?'iconfont icon-shuangxiajiantou-':'iconfont icon-shuangshangjiantou-']"
          @touchend="toggle = !toggle"
        ></span>
      </h2>
      <div class="pinglun_con" v-for="(item) in short_pinglun" :key="item.id" v-if="toggle==false">
        <div class="pic">
          <img :src="item.avatar" alt>
        </div>
        <div class="pinglun_text">
          <div class="pinglun_tit">
            <h3>{{item.author}}</h3>
            <span class="iconfont icon-zan">
              <i>{{item.likes}}</i>
            </span>
          </div>
          <p>{{item.content}}</p>
          <span>{{item.time|filterTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
export default {
  components: {},
  props: [],
  data() {
    return {
      id: this.$route.params.id, // 新闻id
      long_pinglun: [], // 长评论
      long_length: 0, // 长评论个数
      short_pinglun: [],  // 短评论
      short_length: 0,  // 短评论个数
      toggle: true  // 切换显示短评论
    };
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    //   请求长评论
    this.$axios({
      url: API.pinglun + this.id + "/long-comments"
    }).then(data => {
      //   console.log(data);
      this.long_pinglun = data.data.comments;
      this.long_length = this.long_pinglun.length;
    });
    // 请求短评论
    this.$axios({
      url: API.pinglun + this.id + "/short-comments"
    }).then(data => {
      console.log(data);
      this.short_pinglun = data.data.comments;
      this.short_length = this.short_pinglun.length;
    });
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';
// 没有评论
.no_pinglun{
    height 9.9rem
    background-color $select
    border-bottom .01rem solid #e0e0e0
    p{
        line-height 9.9rem
        text-align center
        color $info
        font-size $con2
    }
}
// 评论
.pinglun {
  pinglun()
}

// 头部
.pinglun_nav {
  width: 100%;
  height: $titH;
  z-index: 5;
  background-color: $primary;

  .tit {
    color: $select;
    font-size: $con2;
    text-align: center;
    line-height: $titH;
  }
}
// 返回按钮
.btn {
  position: fixed;
  top: 0.25rem;
  left: 0.2rem;
  z-index: 10;

  .iconfont {
    font-size: $con3;
    color: $select;

    i {
      padding: 0 0.1rem;
    }
  }
}
</style>