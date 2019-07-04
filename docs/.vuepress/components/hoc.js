/**
 * |- props 定义的属性将存在 this.$props，其它属性存到 this.$attrs，监听的事件存到 this.$listeners，3个属性均为对象
 * |- vue2.6.0之后，组件内所有插槽均被视为作用域插槽，使用组件传插槽时，可以接收插槽属性也可以不接收
 * |- 插槽连带标签元素一起传入子组件
 * |- {{ obj }} 时， obj 会被 JSON.stringify 处理再展示
 */
import Vue from 'vue'
export default function (WrappedComponent) {
  return {
    name: 'hoc',
    data () {
      return {}
    },
    props: {
    },
    render (h) {
      /** 静态插槽传递代理 */
      // let slots = []
      // for (let [name, slot] of Object.entries(this.$slots)) {
      //   slots.push(h('template', {slot: name}, slot))
      // }
      // console.log('optionMergeStrategies =>', Vue.config.optionMergeStrategies)
      return h(WrappedComponent, {
        attrs: this.$attrs,
        on: this.$listeners,
        scopedSlots: this.$scopedSlots
      })
    },
    mounted () {
      console.log('mounted')
    }
  }
}