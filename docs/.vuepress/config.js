module.exports = {
  title: 'data Com', // 设置网站标题
  description: 'Just for fun', //描述
  dest: './dist',   // 设置输出目录
  port: 2233, //端口
  themeConfig: { //主题配置
    // 添加导航栏
    nav: [
      { text: '主页', link: '/' }, // 导航条
      { text: '组件文档', link: '/baseComponents/' },
      { text: '知识库', link: '/knowledge/' },
      { text: 'github',        // 这里是下拉列表展现形式。
        items: [
          { text: 'focus-outside', link: 'https://github.com/TaoXuSheng/focus-outside' },
          { text: 'stylus-converter', link: 'https://github.com/TaoXuSheng/stylus-converter' },
        ]
      }
    ],
    // 为以下路由添加侧边栏
    sidebar: {
      '/frontEnd/': [
        '',
        ['android', '这是安卓'],
        ['web', '这是web'],
        ['ios', '这是ios']
        // 'android', 'web', 'ios'
      ],
      '/database/': [
        '',
        'mysql',
        'mongodb'
      ]
    },
    lastUpdated: '最后修改于', // string | boolean
  },
  markdown: {
    lineNumbers: true
  }
}
