<template>
  <div>
    <div @click="btnClick">{{name}}</div>
    <slot name="head">头部插槽</slot>
    <div>==========</div>
    <slot>这是默认插槽的位置</slot>
    <div>==========</div>
    <slot name="footer" from="gd">底部作用域插槽</slot>
  </div>
</template>

<script>
export default {
  name: 'hhww',
  components: {},
  props: {
    name: {
      type: String,
      default: 'default name'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    btnClick () {
      this.$emit('btnClick')
    }
  },
  created () {},
  mounted () {},
  computed: {}
}
</script>

<style lang='less' scoped>
</style>
