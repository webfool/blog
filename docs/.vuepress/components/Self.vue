<template>
  <div>
    <header class="layout-header">
      <img src='/blog/avatar.jpg' alt='Mr.liu' class="author-avatar">
      <h1 class="layout-title">Mr.liu 的博客</h1>
      <p class="layout-description">这是一个中二半吊子码农分享学习经验和生活的网站...</p>
    </header>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  methods: {},
  created () {},
  mounted () {},
  computed: {}
}
</script>

<style lang='stylus' scoped>
.layout-header
  text-align center
  border-top 1px solid

  .author-avatar
    width 20%
    margin-top 40px
    border-radius 50%
    box-shadow 0 0 1rem #333

  .layout-title
    text-shadow 0 0 1rem #333

  .layout-description
    width 80%
    margin: 0 auto 20px
    height 40px
    line-height 40px
    box-shadow 0 0 1rem #333
    font-size 14px
</style>
