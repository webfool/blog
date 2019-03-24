<template>
  <div>
    <div class='select' ref='select' v-initClick:foo.a.b='hideOption'>
      <div>
        <input type="text" class='select_input' placeholder="请选择" :value="val" @click="showOption = !showOption" id='hwInput'>
        <div class="iconbox" ref='icon'></div>
      </div>
      <ul class="select_drowdown" v-show='showOption' id='hwUl'>
        <li v-for='(item, ind) in options' :key='ind' @click="choose(item.value)">{{item.value}}</li>
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
  directives: {
    initClick: {
      bind: function (el, binding, vNode) {
        console.log('binding =>', binding)
        console.log('vNode =>', vNode)
        function handle (e) {
          if (!el.contains(e.target)) {
            binding.expression && binding.value()
          }
        }
        el.handle = handle
        document.addEventListener('click', handle)
      },
      unbind: function (el, binding) {
        console.log('unbind binding =>', binding)
        document.removeEventListener('click', el.handle)
      }
    }
  },
  data () {
    return {
      val: '',
      showOption: false,
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
    choose (val) {
      this.val = val
      this.hideOption()
    },
    hideOption () {
      this.showOption = false
    }
  },
  created () {
  },
  mounted () {
    // let hwSelect = this.$refs.select
    // document.addEventListener('click', (e) => {
    //   if(!hwSelect.contains(e.target)) this.showOption = false
    // })
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
    box-sizing border-box
    outline none
    transition border-color .2s cubic-bezier(.645,.045,.355,1)
    &:focus {
      border-color #409eff
    }
  }

  .select_drowdown 
    position absolute
    top 100%
    left 0
    right 0
    margin 12px 0 5px
    max-height 274px
    overflow auto
    list-style none
    padding 5px 0
    border 1px solid #e4e7ed
    border-radius 4px
    z-index 9999
    background #ffffff

    li 
      padding 0 20px
      height 34px
      line-height 34px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      font-size 14px
      color #606266
      box-sizing border-box
      cursor pointer
      &:hover
        background-color #f5f7fa
  
</style>
