<template>
  <div v-if='!compatible' class="compatiable__box">
    <div class="compatiable__content">
      <div style="margin-bottom: 10px">你使用的浏览器版本过旧，请升级!</div>
      <div style="margin-bottom: 10px">我们建议您使用以下浏览器以获得更好的体验：</div>
      <div>
        <a class="compatiable__item" href="https://www.google.com/chrome/" target="_blank">
          <img src="/blog/chrome.svg" alt="谷歌浏览器"><br>
          <span>chrome</span><br>
          <span class="recommand">推荐使用</span>
        </a>
        <a class="compatiable__item" href='https://www.firefox.com.cn/' target="_blank">
          <img src="/blog/firefox.jpg" alt="火狐浏览器"><br>
          <span>firefox</span><br>
          <span class="recommand">推荐使用</span>
        </a>
      </div>
    </div>
  </div>
  <div v-else v-insert='scrollFn'>
    <header class="layout-header" v-img='headImg'>
      <img src='/blog/avatar.jpg' alt='Mr.liu' class="author-avatar">
      <h1 class="layout-title">Mr.liu </h1>
      <p class="layout-description">这是一个中二半吊子码农分享学习经验和生活的网站...</p>
    </header>
    <nav class="layout-nav">
      <div class="nav-item layout-logo">
        <a href='#'>
          <img src='/blog/name.gif' style='height: 60px'>
        </a>
      </div>
      <div class="nav-item">
        <a href='#'>编程笔记</a>
      </div>
      <div class="nav-item">
        <a href='#'>随笔</a>
      </div>
      <div class="nav-item">
        <a href='#'>关于我</a>
      </div>
    </nav>
    <hwSelect></hwSelect>
  </div>
</template>

<script>
import hwSelect from './hwSelect'
import {throttle, isCompatible} from '../utils'
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
          setTimeout(() =>{
            el.style.backgroundImage = `url('${binding.value}')`
          }, 1000)
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
      compatible: isCompatible(),
      headImg: 'http://www.zfowed.com/static/img/25025.jpg',
      scrollFn: throttle(function () {
        console.log('scroll!!')
      }, 500)
    }
  },
  methods: {
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
  animation flash 1s
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
          animation flash 0.6s

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
  color #555
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
  &:after {
    display block
    content ''
    width 0
    height 0
    clear both
  }
</style>
