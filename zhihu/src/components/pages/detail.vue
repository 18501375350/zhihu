<template >
  <div class="detail">
    <!-- 引入请求回来的CSS -->
    <link rel="stylesheet" :href="cs">
    <!-- 插入请求回来的HTML内容 -->
    <div v-html="con"></div>
    <!-- 图片 -->
    <div class="pic">
      <img :src="img" alt>
    </div>
    <!-- 底部 -->
    <div class="ft">
      <span class="iconfont icon-fanhui-" @touchend="$router.go(-1)"></span>
      <span class="iconfont icon-xiala"></span>
      <span class="iconfont icon-zan">
        <i>{{dianzan}}</i>
      </span>
      <span class="iconfont icon-share" @touchend="maskIn()"></span>
      <span class="iconfont icon-pinglun" @touchend="$router.push('/pinglun/'+id)">
        <i>{{all_pinglun}}</i>
      </span>
    </div>
    <div class="mask" @touchmove.self="maskMove($event)" @touchend.self="maskOut()">
      <div class="con">
        <p @touchend="collect()" class="collect">收藏</p>
        <p @touchend="maskOut()">取消</p>
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
      id: this.$route.params.id,  // 新闻id
      con: null,  // 请求回来的HTML内容
      cs: null, // 请求回来的CSS
      img: null,  // 请求回来的图片地址
      all_pinglun: 0, // 评论总数
      dianzan: 0  // 点赞数
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 遮罩出现
    maskIn() {
      this.$(".mask").css("bottom", 0);
      return false;
    },
    // 遮罩滑动
    maskMove(e) {
      e.preventDefault();
    },
    // 遮罩隐藏
    maskOut() {
      this.$(".mask").css("bottom", "-100%");
    },
    // 点击收藏
    collect() {
      // 判断本地存储arr,有则赋值,没有则新建空数组
      var arr = localStorage.getItem("arr")
        ? JSON.parse(localStorage.getItem("arr"))
        : [];
      // 循环判断是否已收藏
      if (arr.some(item => item.id == this.id)) {
        // 已收藏过,删除这条
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id == this.id) {
            arr.splice(i, 1);
            break;
          }
        }
        this.$(".collect").html("收藏");
      } else {
        // 没有收藏过,添加到本地存储
        arr.push({
          title: this.title,
          id: this.id,
          img: this.img
        });
        this.$(".collect").html("已收藏");
      }
      // 添加本地存储
      localStorage.setItem("arr", JSON.stringify(arr));
    }
  },
  mounted() {
    // 挂载后,获取是否收藏信息
    var arr = localStorage.getItem("arr")
      ? JSON.parse(localStorage.getItem("arr"))
      : [];
    if (arr.some(item => item.id == this.id)) {
      this.$(".collect").html("已收藏");
    } else {
      this.$(".collect").html("收藏");
    }

    // console.log(this.id);
    // 请求新闻详情信息
    this.$axios({
      url: API.detail + this.id
    }).then(data => {
      // console.log(data);
      // console.log(this.$route.params.id);
      this.cs = data.data.css[0];
      this.con = data.data.body;
      this.img = data.data.images[0];
      this.title = data.data.title;
    });

    // 请求新闻额外信息
    this.$axios({
      url: API.other + this.id
    }).then(data => {
      console.log(data);
      console.log(this.$route.params.id);
      this.all_pinglun = data.data.comments;
      this.shor_pinglun = data.data.short_comments;
      this.long_pinglun = data.data.long_comments;
      this.dianzan = data.data.popularity;
    });
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

// 外框
.detail {
  position: relative;
}

// 图片
.pic {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 3.4rem;

  img {
    width: 100%;
    height: 100%;
  }
}

// 底部
.ft {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: $footerH;
  border-top: 1px solid #ccc;
  background-color: $select;

  .iconfont {
    flex: 1;
    // color #999;
    text-align: center;
    font-size: 0.3rem;
    line-height: $footerH;

    i {
      font-size: $con4;
      color: $info;
      padding: 0 0.1rem;
    }
  }
}

.mask {
  position: fixed;
  bottom: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.2s;

  .con {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #e0e0e0;
    padding: 0.3rem 0;

    p {
      width: 80%;
      margin: 0.2rem auto !important;
      text-align: center;
      font-size: $con3;
      background-color: $select;
      color: $info;
      padding: 0.2rem;
    }
  }
}
</style>
