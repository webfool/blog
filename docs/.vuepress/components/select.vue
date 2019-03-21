<template>
  <div>
    <div class='select'>
      <div>
        <input type="text" class='select_input' readonly='readonly' placeholder="请选择">
        <div class="iconbox"></div>
      </div>
      <ul>
        <li v-for='(item, ind) in options' :key='ind'>{{item.value}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  props: {
  },
  data () {
    return {
      options: [
        {value: '苹果'},
        {value: '香蕉'},
        {value: '雪梨'},
        {value: '莲雾'},
        {value: '榴莲'}
      ]
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style lang='stylus'>
.select
  position relative
  width 240px

  .select_input {
    display inline-block
    width 100%
    height 40px
    line-height 40px
    padding 0 15px
    color #606266
    font-size 14px
    border 1px solid #dcdfe6
    border-radius 4px
    cursor pointer
  }
</style>