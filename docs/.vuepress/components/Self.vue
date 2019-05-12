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
    <a class="download-btn" href='https://github.com/WZOnePiece/study-draggable/archive/master.zip'>js 常用方法工具包</a>
    <a class="download-btn" href='/blog/browser/firefox.jpg' download="img.jpg">js 常用方法工具包</a>
    <button @click="btnClick">打开</button>
    <input type="file" @change='fileChange'>
    <canvas id='canvas'></canvas>
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
import {throttle, isCompatible} from '../utils'
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
      compatible: isCompatible(),
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
    btnClick () {
      let str = 'abc'
      let codes = str.split('').map(char => char.charCodeAt(0))
      let uint16 = new Uint16Array(codes)
      console.log(uint16.length, uint16.buffer.byteLength)
      // 测试 Uint16
      // let url = URL.createObjectURL(new Blob([uint16], {type: 'application/vnd.ms-excel'}))
      
      // 测试 uint8
      // let buf = new ArrayBuffer(3)
      // let uin8 = new Uint8Array(buf)
      // let uin8_other = new Uint8Array(uint16.buffer)
      // console.log('uin8_other =>', uin8_other)
      // uin8[0] = uin8_other[0]
      // uin8[1] = uin8_other[2]
      // uin8[2] = uin8_other[4]
      // console.log('uin8 =>', uin8)
      // let url = URL.createObjectURL(new Blob([uin8], {type: 'application/vnd.ms-excel'}))

      // 测试 TextEncoder
      let encoder = new TextEncoder()
      let uin8 = encoder.encode(str)
      let url = URL.createObjectURL(new Blob([uin8], {type: 'application/vnd.ms-excel'}))

      let a = document.createElement('a')
      a.href = url
      a.download = ''
      a.click()
    },
    /**
     * 1、文件转 base64后，base64存有 "文件类型信息" 和 "文件内容"
     * 2、blob通过 URL.createObjectURL生成 url链接后，a标签导出不设置 download文件名，将按 url后缀定义文件名，生成的文件类型由 blob的 type类型决定
     *  如生成
     *    blob:http://localhost:2233/e07b7a5f-3351-4fd3-9ea5-88280c551cb2
     *  将生成 e07b7a5f-3351-4fd3-9ea5-88280c551cb2.后缀
     * 3（猜想）、数据转二进制，由编码决定，通常是 utf-8, 所以 blob的编码应该是 utf-8
     * 4、FileReader将 blob/ File 读成 ArrayBuffer，二进制数据一致
     * 5、excel文件导入之后操作，可采用 js-xlxs插件
     */

    /**
     * utf-16总结：
     * 1、基本平面是2字节，辅助平面是4字节
     * 2、辅助平面字符：前2字节在 (\uD800 ~ \uD8FF) 之间，后2字节在 (\uDC00 ~ \uDFFF) 之间
     * 3、其他均为基本平面字符
     * 4、js中 DOMString采用 utf-16编码， string方法均是按2字节为单元进行操作
     */
    fileChange (e) {
      let file = e.target.files[0]

      // 采用 TextDecode解码, utf-8编码的 txt文件政策，但excel会乱码，这个可放弃
      // let filereader = new FileReader()
      // filereader.readAsArrayBuffer(file)
      // filereader.onload = () => {
      //   let result = filereader.result
      //   console.log('result =>', result)
        // let decoder = new TextDecoder()
        // let text = decoder.decode(result)
        // console.log('text =>', text)
      // }

      // 采用 fileReader读取
      let filereader = new FileReader()
      filereader.readAsDataURL(file)
      filereader.onload = () => {
        let result = filereader.result
        console.log('result =>', result)
        let data = atob(result.split(',')[1])
        let n = data.length
        let uin8 = new Uint8Array(n)
        while (n) {
          uin8[n - 1] = String.prototype.charCodeAt.call(data[n - 1])
          n--
        }
        console.log('uin8 =>', uin8.buffer)
        // let blob2 = new Blob([uin8], {type: 'application/vnd.ms-excel'})
        // let url = URL.createObjectURL(blob2)
        // let a = document.createElement('a')
        // a.href = url
        // a.download = ''
        // a.click()
      }
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
