module.exports = {
  theme: 'yubisaki',
  title: 'hw-home', // 设置网站标题
  description: "hw's blog", //描述
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}]
  ],
  dest: '../dist',   // 设置输出目录
  base: '/blob/',
  port: 2233, //端口
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: 'frontEnd', link: '/categories/frontEnd' },
      { text: 'backEnd', link: '/categories/backEnd' }
    ],
    footer: '如果说人生是一场旅行，而我是这场旅行的主人!',
  },
}
