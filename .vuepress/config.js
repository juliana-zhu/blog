const themeConfig = require('./config/theme')
module.exports = {
    dest: 'public',
    base: '/',
    title: "🐾前端meow同学",
    description: 'Juliana',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    markdown: {
        lineNumbers: true
    },
    //额外的需要被注入到当前页面<head>中的标签
    locales: {
        "/": {
            lang: "zh-CN"
        }
    },
    theme: 'reco',
    themeConfig,
}
