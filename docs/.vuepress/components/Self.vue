<template>
  <div v-if='!compatible' class="compatiable__box">
    <div class="compatiable__content">
      <div style="margin-bottom: 10px">你使用的浏览器版本过旧，请升级!</div>
      <div style="margin-bottom: 10px">我们建议您使用以下浏览器以获得更好的体验：</div>
      <div>
        <a class="compatiable__item" href="https://www.google.com/chrome/" target="_blank">
          <img :src="images.chrome" alt="谷歌浏览器"><br>
          <span>chrome</span><br>
          <span class="recommand">推荐使用</span>
        </a>
        <a class="compatiable__item" href='https://www.firefox.com.cn/' target="_blank">
          <img :src="images.firefox" alt="火狐浏览器"><br>
          <span>firefox</span><br>
          <span class="recommand">推荐使用</span>
        </a>
      </div>
    </div>
  </div>
  <div v-else v-insert='scrollFn'>
    <!-- 头部 -->
    <header class="layout-header" v-img='headImg'>
      <img :src='images.avatar' alt='Mr.liu' class="author-avatar">
      <h1 class="layout-title">Mr.liu </h1>
      <p class="layout-description">这是一个中二半吊子码农分享学习经验和生活的网站...</p>
    </header>
    <!-- 文件下载 -->
    <div class="head-tag">常用文件</div>
    <a class="download-btn" href='/blog/export/utils.js' download="utils.js">js 常用方法工具包</a>
    <button @click="test">测试</button>
    <!-- 网站导航 -->
    <div class="head-tag">常用社区</div>
    <div class="link-box">
      <a :href="item.url" target='__blank' v-for='item in links'>
        <div class="link-item">
          <div class="logo">
            <img :src="item.img" :alt="item.alt">
            {{item.name}}
          </div>
          <div class="des">
            {{item.des}}
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import hwSelect from './hwSelect'
import {throttle, isCompatible, toDicimal} from '../utils'
import images from '../utils/images'
import { Base64 } from 'js-base64'

export default {
  name: '',
  components: {
    hwSelect
  },
  props: {},
  directives: {
    img: {
      inserted: function (el, binding) {
        el.style.background = '#555'
        let img = new Image()
        img.src = binding.value
        img.onload = function () {
          el.style.backgroundImage = `url('${binding.value}')`
        }
      }
    },
    insert: {
      bind: function (el, binding) {
        document.addEventListener('scroll', binding.value)
      },
      unbind: function (el, binding) {
        document.removeEventListener('scroll', binding.value)
      }
    }
  },
  data () {
    return {
      images,
      compatible: true,
      headImg: images.headBg,
      scrollFn: throttle(function () {
        console.log('scroll!!')
      }, 500),
      links: [
        {url: 'https://juejin.im', img: images.juejin, alt: '掘金', name: '掘金', des: '只有高手分享的中文技术社区'},
        {url: 'https://github.com/', img: images.github, alt: 'github', name: 'GitHub', des: '面向开源及私有软件项目的git托管平台'},
        {url: 'https://www.v2ex.com/', img: images.v2ex, alt: 'V2EX', name: 'V2EX', des: '一个关于分享和探索的地方'},
        {url: 'https://cnodejs.org/', img: images.cnode, alt: 'cNode', name: 'cNode', des: 'Node.js专业中文社区'},
        {url: 'https://caniuse.com/', img: images.caniuse, alt: 'Can I use', name: 'Can I use', des: 'Web前端兼容性列表'}
      ]
    }
  },
  methods: {
    test () {
      console.log(toDicimal(-12.124564))
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {}
}
</script>

<style lang='stylus' scoped>
@keyframes flash
  0%
    opacity 1

  25%
    opacity 0.5

  50%
    opacity 0

  75%
    opacity 0.5

  100%
    opacity 1

.compatiable__box
  height 100%

  &::before
    display inline-block
    height 100%
    content ''
    width 0
    vertical-align middle

  .compatiable__content
    display inline-block
    vertical-align middle
    width 100%
    text-align center

    .compatiable__item
      display inline-block
      text-decoration none
      color #999
      &:hover
          animation flash 0.2s

      img
        width 80px
        height 80px

      &+.compatiable__item
        margin-left 20px

      .recommand
        border 1px solid #999
        line-height 20px
        border-radius 5px
        padding 0 5px

.layout-header
  text-align center
  color #000
  border-top 1px solid
  background-attachment fixed
  background-size cover
  // background-image url('../public/head-bg.jpg')
  overflow hidden

  .author-avatar
    width 20%
    margin-top 40px
    border-radius 50%
    box-shadow 0 0 1rem #333

  .layout-title
    text-shadow 0 0 1rem #333
    color #fff

  .layout-description
    width 80%
    margin: 0 auto 20px
    height 40px
    line-height 40px
    box-shadow 0 0 1rem #333
    font-size 14px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis

.layout-nav
  .nav-item
    float left

    a
      display block
      padding 0 10px
      height 60px
      line-height 60px
      font-size 14px
      color #555
      text-decoration none
      transition color .3s

      &:hover
        color #009889

    &.layout-logo
      a
        padding 0

  &:after
    display block
    content ''
    width 0
    height 0
    clear both

.head-tag
  margin-top 15px
  line-height 30px
  font-size 18px
  color #000
  border-left 2px solid #607d8b
  padding-left 10px
.link-box
  &::after
    display block
    content ''
    width 0
    height 0
    clear both

  a
    text-decoration none

.link-item
  float left
  margin 15px 0 0 15px
  padding 10px
  box-sizing border-box
  font-size 14px
  line-height 14px
  border 1px solid #e4ecf3
  border-radius 6px
  box-shadow 1px 1px 4px #000

  &:hover
    transform translate(0, -6px)
    transition all ease .3s

  .logo
    color #3273dc
    font-weight 700
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    img
      width  50px
      height 50px
      border-radius 50%
      vertical-align middle

  .des
    height 28px
    margin-top 10px
    font-size 12px
    color gray
    display -webkit-box
    -webkit-box-orient vertical
    -webkit-line-clamp 2
    overflow hidden

.download-btn
  cursor pointer
  font-size 16px
  color #3273dc
  margin-left 20px

@media screen and (min-width: 480px)
  .lin-item
    width 46.8%

@media screen and (min-width: 667px)
  .link-item
    width 31%

@media screen and (min-width: 960px)
  .link-item
    width 47.5%

@media screen and (max-width: 480px)
  .link-item
    width 100%
    margin-left 0
</style>
