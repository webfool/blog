<template>
  <div>
    <div @click="btnClick">{{name}}</div>
    <slot>这是默认插槽的位置</slot>
    <slot name="footer" from="gd">这是作用域插槽的位置</slot>
    <div>==========</div>
    <slot>第二个默认插槽的位置</slot>
    <slot name="footer" from="jl">第二个作用域插槽的位置</slot>
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
