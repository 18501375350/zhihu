<template>
  <div class="wrapper">
    <!-- 顶部标题 -->
    <div class="collect_nav toFixed">
      <div class="btn" @touchend="$router.go(-1)">
        <span class="iconfont icon-fanhui-"></span>
      </div>
      <p class="tit">收藏</p>
    </div>
    <!-- 内容列表 -->
    <div class="news" v-for="(item,index) in arr" :key="index">
      <ul>
        <li @touchstart="start" @touchmove="move" @touchend="toDetail(item.id)">
          <p>{{item.title}}</p>
          <div class="pic">
            <img :src="item.img" alt>
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
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  data() {
    return {
      arr: [] // 收藏的数组
    };
  },
  watch: {},
  computed: {},
  methods: {
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
    }
  },
  mounted() {
    // 获取本地存储中的收藏信息
    this.arr = JSON.parse(localStorage.getItem("arr"));
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';
// 顶部
.collect_nav {
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

// 返回
.btn {
  position: fixed;
  top: 0.25rem;
  left: 0.2rem;
  z-index: 10;

  .iconfont {
    font-size: $con3;
    color: $select;
  }
}

// 收藏内容
.news {
  news();
}
</style>