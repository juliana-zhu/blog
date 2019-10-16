module.exports = {
  title: "🐾Juliana's note",
  description: 'Juliana的学习笔记',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: {
      '/browser/': [
        '',
        'chrome的进程架构',
        'TCP',
        'HTTP'
      ],
      '/promise/': [
        '',
        'all&race&try',
        'others'
      ],
    },
    sidebarDepth: 1,
    lastUpdated: 'Last Updated',
    displayAllHeaders: true // 默认值：false
  }
}
