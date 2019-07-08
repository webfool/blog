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
    <header class="layout-header" v-img='headImg' v-if='false'>
      <img :src='images.avatar' alt='Mr.liu' class="author-avatar">
      <h1 class="layout-title">Mr.liu </h1>
      <p class="layout-description">这是一个中二半吊子码农分享学习经验和生活的网站...</p>
    </header>
    <!-- 文件下载 -->
    <div class="head-tag">常用文件</div>
    <a class="download-btn" href='/blog/export/utils.js' download="utils.js">js 常用方法工具包</a>
    <button @click="test">按钮</button>
    <hwButton name="change name" @btnClick="btnClick" @a="test" first="liu">
      <a href="#">默认的</a>
      <!-- <template #head>覆盖头部</template> -->
      <a href="#" slot="head">覆盖头部</a>
      <template #footer="scope">
        I am from {{scope.from}}
      </template>
    </hwButton>
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
    <div style="height: 500px; border: 1px solid; background: #d2d2e4; margin-top: 20px;">
      <div style="width: 100px; height: 100px; background: red; float: left;">
        <span v-for='item in dragItems' style='margin-right: 10px; line-height: 20px; cursor: pointer' draggable='true' @dragstart='itemDragstart' :id='item.id'>{{item.text}}</span>
      </div>
      <div style="position: relative; width: 200px; height: 200px; background: green; float: right;" @dragover='canDrop' @drop='drop'></div>
    </div>
    <!-- <div style='position: fixed; right: 0; bottom: 0; width: 50px; height: 50px; border-radius: 50%; background: red; cursor: pointer; z-index: 999' id='a' draggable='true' @dragstart='cirDrag'></div> -->
  </div>
</template>

<script>
import hwSelect from './hwSelect'
import {throttle, throttle2, isCompatible, toDicimal, getEleOffset, unique1, unique2, flatten, curry, partial, lazyDate, memorize, compose, compose2} from '../utils'
import images from '../utils/images'
import { Base64 } from 'js-base64'
// 高阶组件测试
import createHOC from './hoc'
import button from './button'

export default {
  name: '',
  components: {
    hwSelect,
    hwButton: createHOC(button)
    // hwButton: button
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
      ],
      dragItems: [
        {text: '名称', id: 'name'},
        {text: '数量', id: 'amount'},
        {text: '金额', id: 'amt'}
      ]
    }
  },
  methods: {
    test: function () {
      function ab(a, b) {return a + b}
      function c (c) {return c + 1}
      function d (d) {return d + 2}
      let com = compose(ab)
      console.log(com(1, 2))
    },
    btnClick () {
      console.log('btnClick!')
    },
    initObj () {
      function Person () {
        this.name = ''
      }

      Person.prototype = {
        setFrist (first) {
          this.name = first + '' + this.name
          return this
        },
        setLast (last) {
          this.name += ` ${last}`
          return this
        }
      }
      return new Person()
    },
    // 悬浮图标放方法
    cirDrag (e) {
      let style = window.getComputedStyle(e.target, null);
      e.dataTransfer.setData('position',
        `${(e.clientX - parseInt(style.getPropertyValue('left')))},${(e.clientY - parseInt(style.getPropertyValue('top')))}`
      );
    },
    // 此处开始价格牌拖拽测试
    itemDragstart (e) {
      console.log('drapstart!')
      // pageX, pageY是相对于 body，而 clientX、clientY是相对于浏览器可视区部分，offsetLeft、offsetTop是相对于父元素
      let {offsetLeft, offsetTop} = getEleOffset(e.target)
      let {pageX, pageY} = e
      let [cursorX, cursorY] = [pageX - offsetLeft, pageY - offsetTop]
      e.dataTransfer.setData('position', `${cursorX},${cursorY}`)
      e.dataTransfer.setData('id', e.target.id)
    },
    canDrop (e) {
      console.log('dragover!')
      e.preventDefault()  // 默认情况下，drop操作不会触发容器元素的 drop事件，取消默认之后才能触发
    },
    drop (e) {
      console.log('drop!')
      e.preventDefault()  // drop的默认行为是以链接的形式打开

      // 这部分计算 position定位x, y
      let [cursorX, cursorY] = e.dataTransfer.getData('position').split(',')
      let {offsetLeft, offsetTop} = e.target
      let {pageX, pageY} = e
      let [x, y] = [pageX - offsetLeft - cursorX, pageY - offsetTop - cursorY]

      // 设置元素定位
      let id = e.dataTransfer.getData('id')
      let el = document.getElementById(id)
      el.style.position = 'absolute'
      el.style.left = x + 'px'
      el.style.top = y + 'px'
      e.target.appendChild(el)
    }
  },
  created () {
    // document.body.addEventListener('dragover', (e) => {
    //   e.preventDefault()
    // }, false)
    // document.body.addEventListener('drop', (e) => {
    //   let [offsetX, offsetY] = e.dataTransfer.getData('position').split(',')
    //   let left = e.clientX - Number(offsetX)
    //   let top = e.clientY - Number(offsetY)
    //   let cir = document.getElementById('a')
    //   cir.style.left = left + 'px'
    //   cir.style.top = top + 'px'
    //   cir.style.bottom = 'auto'
    //   cir.style.right = 'auto'
    // }, false)
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
