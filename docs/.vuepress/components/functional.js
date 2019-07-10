export default {
  functional: true,
  render (h, context) {
    console.log('context =>', context)
    console.log('slots =>', context.slots())
    return h('div', ['abc', context.scopedSlots.slot2()])
  }
}