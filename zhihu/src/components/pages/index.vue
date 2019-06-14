<template>
  <div class="index" @touchend="load()">
    <!-- 顶部标题 -->
    <div class="nav toFixed">
      <p class="tit">今日热闻</p>
    </div>
    <!-- 按钮 -->
    <div class="btn" @touchend="maskIn()">
      <span class="iconfont icon-option"></span>
    </div>
    <!-- banner -->
    <div class="banner">
      <mt-swipe :auto="2000">
        <mt-swipe-item v-for="item in top_stories" :key="item.id">
          <img
            :src="item.image"
            alt
            @touchstart="start"
            @touchmove="move"
            @touchend="toDetail(item.id)"
          >
          <p>{{item.title}}</p>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 当日新闻内容 -->
    <div class="news">
      <ul>
        <li
          v-for="item in stories"
          :key="item.id"
          @touchstart="start"
          @touchmove="move"
          @touchend="toDetail(item.id)"
        >
          <p>{{item.title}}</p>
          <div class="pic">
            <img :src="item.images[0]" alt>
          </div>
        </li>
        <!-- <li>
          <p>阿萨德hisad后isad横扫ID横扫ID活动i</p>
          <div class="pic">
            <img src="https://pic1.zhimg.com/v2-af99447ded7fe236a2113bfae6f3aad8.jpg" alt>
          </div>
        </li>-->
      </ul>
    </div>
    <!-- 往日新闻 -->
    <div class="news beforenews" v-for="(item,index) in allNews" :key="index">
      <h2>{{item.data.date|filterDate}}</h2>
      <ul>
        <li
          v-for="(suIitem,subIndex) in item.data.stories"
          :key="subIndex"
          @touchstart="start"
          @touchmove="move"
          @touchend="toDetail(suIitem.id)"
        >
          <p>{{suIitem.title}}</p>
          <div class="pic">
            <img :src="suIitem.images[0]" alt>
          </div>
        </li>
      </ul>
    </div>
    <!-- 个人信息 -->
    <div class="mask" @touchend.self="maskOut()" @touchmove="maskMove($event)">
      <div class="mask_con">
        <div class="desc">
          <div class="tit_pic">
            <img src alt>
          </div>
          <p>BackMyHeart丷</p>
        </div>
        <div class="icon">
          <div @touchend='$router.push("/collect")'>
            <span class="iconfont icon-shoucang"></span>
            <p>收藏</p>
          </div>
          <div>
            <span class="iconfont icon-xiaoxi"></span>
            <p>消息</p>
          </div>
          <div>
            <span class="iconfont icon-shezhi"></span>
            <p>设置</p>
          </div>
        </div>
        <div class="to_home">
          <span class="iconfont icon-shouye"></span>
          <p @touchend='maskOut()'>首页</p>
          <span class="iconfont icon-you"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// 引入API
import API from "../../common/js/API";
// 引入mint-ui的轮播图组件
import { Swipe, SwipeItem } from "mint-ui";
export default {
  components: {},
  props: [],
  data() {
    return {
      top_stories: [],  // 轮播图内容
      stories: [],  // 当日新闻
      nowDate: new Date().getTime(),  // 当前日期
      beforeNews: [], // 往日新闻
      newsTitle: "",  // 标题
      allNews: [],  // 所有新闻
      startX: 0,  // touch事件起始X轴坐标
      startY: 0,  // touch事件起始Y轴坐标
      endX: 0,  // touch事件结束X轴坐标
      endY: 0 // touch事件结YX轴坐标
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 加载当日新闻
    load() {
      var top = this.$(window).scrollTop();
      var clientH = this.$(window).height();
      var bodyH = this.$(document).height();
      //   console.log(top, clientH, bodyH);

      // 加载更多
      if (bodyH - (top + clientH) < 100) {
        var newDate = this.nowDate;
        this.nowDate -= 86400000;
        var date = new Date(newDate);
        var year = date.getFullYear();
        var month =
          date.getMonth() + 1 > 10
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1);
        var day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
        newDate = year + month + day;
        this.$axios({
          url: API.beforeNews + newDate
        }).then(data => {
          this.allNews.push(data);
          // console.log(data);
        });
      }
    },
    // touch按下事件
    start(e) {
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.endX = 0;
      this.endY = 0;
    },
    // touch移动事件
    move(e) {
      this.endX = e.touches[0].clientX;
      this.endY = e.touches[0].clientY;
    },
    // touch抬起事件
    toDetail(id) {
      if (this.endX == 0 && this.endY == 0) {
        this.$router.push("/detail/" + id);
      }
    },
    // 遮罩出现
    maskIn() {
      this.$(".mask").css({
        left: 0,
        "background-color": "rgba(0, 0, 0, 0.5)",
        opacity: 1
      });
    },
    // 遮罩滑动
    maskMove(e) {
      e.preventDefault();
    },
    // 遮罩隐藏
    maskOut() {
      this.$(".mask").css("left", "-100%");
    }
  },
  mounted() {
    //   请求banner数据
    this.$axios({
      url: API.latestNews
    }).then(data => {
      this.top_stories = data.data.top_stories;
      this.stories = data.data.stories;
    });
    // 滚动事件
    this.$(document).scroll(() => {
      var top = this.$(window).scrollTop(); // 滚动条高度
      var clientH = this.$(window).height(); // 可视区高度
      var bodyH = this.$(document).height(); // 文档高度
      //   console.log(top, clientH, bodyH);

      // 顶部标题背景
      if (top > 100) {
        this.$(".nav").css("background", "#00a2ed");
      } else {
        this.$(".nav").css("background", "transparent");
      }

      //   顶部标题切换
      var tit = this.$("h2");
      // banner+当日新闻高度
      var cH =
        this.$(".news")
          .eq(0)
          .height() + this.$(".banner").height();
      // 如果滚动高度<banner+当日新闻高度，显示今日热闻
      if (top < cH) {
        this.$(".nav .tit").html("今日热闻");
      } else {
        // 否则显示第循环标题，显示满足条件的标题
        for (var i = 0; i < tit.length; i++) {
          if (tit.eq(i).offset().top - top <= tit.eq(i).height()) {
            this.$(".nav .tit").html(tit.eq(i).html());
          }
        }
      }
    });
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

// 个人信息
.mask {
  position: fixed;
  top: 0px;
  left: -100%;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 20;
  transition: all 0.3s;

  .mask_con {
    width: 50%;
    height: 100%;
    background: #333;
    overflow: hidden;
  }

  .desc {
    display: flex;
    width: 80%;
    margin-left: 0.2rem;
    margin-top: 0.3rem;

    .tit_pic {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: #999;

      img {
        width: 100%;
        height: 100%;
      }
    }

    p {
      flex: 1;
      line-height: 0.5rem;
      padding-left: 0.2rem;
      font-size: $con5;
      color: $info;
    }
  }

  .icon {
    display: flex;
    width: 80%;
    margin-top: 0.3rem;

    div {
      flex: 1;
      text-align: center;

      .iconfont {
        font-size: $con2;
        color: $info;
      }

      p {
        padding: 0.1rem;
        color: $info;
        font-size: $con5;
      }
    }
  }

  .to_home {
    display: flex;
    background-color: #222;
    padding: 0.25rem;
    margin-top: 0.1rem;

    span {
      flex: 1;
      font-size: $con4;
    }

    p {
      flex: 3;
      font-size: $con4;
      color: $select;
    }
  }
}

.index >>> .mint-swipe-items-wrap {
  height: 4rem;
}

.index >>> .mint-swipe-indicator {
  opacity: 1;
}

.mint-swipe-items-wrap {
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  p {
    position: absolute;
    left: 0;
    bottom: 0.2rem;
    font-size: $con2;
    color: $select;
    padding: 0 0.2rem;
    line-height: 1.5em;
    background: rgba(0, 0, 0, 0.5);
  }
}

// 今日热闻导航
.nav {
  width: 100%;
  height: $titH;
  z-index: 5;
  background: transparent;
  transition: all 1s;

  .tit {
    color: $select;
    font-size: $con2;
    text-align: center;
    line-height: $titH;
  }
}

// 新闻列表
.news {
  news();
}

// iconfont
.iconfont {
  color: $select;
}
// 个人信息按钮
.btn {
  position: fixed;
  top: 0.25rem;
  left: 0.2rem;
  z-index: 10;
}
// 顶部定位
.toFixed{
  position fixed
  top 0px
  left 0
  z-index 5
}
</style>