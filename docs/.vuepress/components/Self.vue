<template>
  <div>
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
    <input @input="input" @compositionstart='compositionstart' @compositionend='compositionend'>
  </div>
</template>

<script>
import hwSelect from './hwSelect'
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
    }
  },
  data () {
    return {
      headImg: 'http://www.zfowed.com/static/img/25025.jpg'
    }
  },
  methods: {
    input (e) {
      console.log('input =>', e.target.value)
      setTimeout(() => {
        console.log('out')
      }, 0)
    },
    compositionstart () {
      console.log('compositionstart')
    },
    compositionend () {
      console.log('compositionend')
    }
  },
  created () {},
  mounted () {
  },
  computed: {}
}
</script>

<style lang='stylus' scoped>
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
