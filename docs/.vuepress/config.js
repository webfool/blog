module.exports = {
  theme: 'yubisaki',
  title: "Mr.liu", // 设置网站标题
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
    // 顶部导航栏logo
    logo: '/favicon.ico',
    // 开启顶部导航的标签路由
    tags: true,
    /**
     * 顶部导航，不支持原生主题中items下拉
     * tag：代表是否是标签路由
     * root：代表是否是主页，多个选项含root,则以最后一个为准；
     * 进入root页将展示列表，列表除去顶部导航栏对应目录下的md,也除去当前root目录下的README.md
     */
    nav: [
      { text: 'Blog', link: '/frontEnd/', root: true},
      { text: 'Tags', link: '/tags/', tags: true },
      { text: 'GITHUB', link: 'https://github.com/webfool' }
    ],
    // 设置之后右边会出现个人github信息卡片栏
    github: 'webfool',
    // 设置每页显示文章数量
    per_page: 5,
    // 定义文章标题颜色
    accentColor: '#ac3e40',
    // 定义背景图片，只能是相对于 .vuepress/public 的文件路径
    background: '/favicon.ico',
    footer: '如果说人生是一场旅行，而我是这场旅行的主人!',
    // comment: {
    //   clientID: '4779161d8d0e96d18948',
    //   clientSecret: '2a8c36f4b3eda7e692224be513730f94443085dd',
    //   repo: 'blog',
    //   owner: 'lewiscutey',
    //   admin: 'lewiscutey',
    //   distractionFreeMode: false
    // },
  },
}
