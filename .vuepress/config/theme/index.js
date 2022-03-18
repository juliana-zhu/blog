module.exports = {
    type: 'blog',
    // 博客配置
    blogConfig: {
        category: {
            location: 2,     // 在导航栏菜单中所占的位置，默认2
            text: '分类' // 默认文案 “分类”
        },
        tag: {
            location: 3,     // 在导航栏菜单中所占的位置，默认3
            text: '标签'      // 默认文案 “标签”
        }
    },
    logo: '/avatar.jpeg',
    authorAvatar: '/avatar.jpeg',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    subSidebar: 'auto',
    sidebarDepth: 4,
    // 作者
    author: 'Juliana',
    // 备案号
    record: '粤ICP备2020125275号-1',
    // 备案链接
    recordLink: 'https://beian.miit.gov.cn/',
    // 项目开始时间
    startYear: '2019',
    /**
     * support for
     * 'default'
     * 'funky'
     * 'okaidia'
     * 'solarizedlight'
     * 'tomorrow'
     */
    codeTheme: 'funky', // default 'tomorrow'
    nav: [
        { text: '主页', link: '/', icon: 'reco-coding' },
        { text: 'GitHub',  icon: 'reco-github', link: 'https://github.com/Juliazlj' },
    ],
    lastUpdated: '更新时间',
}
