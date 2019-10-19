module.exports = {
    base: '/note_web/',
    title: "🐾Juliana's note",
    description: 'Juliana的学习笔记',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: [
            {text: '主页', link: '/'},
            {text: 'Promise', link: '/promise/'},
            {text: 'ES6', link: '/es6/Class/'},
            {text: '浏览器', link: '/browser/chrome的进程架构/'},
            {text: 'node', link: '/node/EventEmitter/'},
            {text: 'eventloop', link: '/eventloop/'},
            {text: 'react', link: '/react/react-1/'},
        ],
        sidebar: {
          '/browser/': [
            'chrome的进程架构',
            'TCP',
            'HTTP'
          ],
          '/node/': [
            'EventEmitter'
          ],
          '/eventloop/': [
            ''
          ],
          '/promise/': [
            '',
            'all&race&try',
            'others'
          ],
          '/es6/': [
            'Class',
            'curry&uncurry',
            'DeepClone'
          ],
          '/react/': [
            'react-1',
            'react-2'
          ],
          // fallback
          '/': [
            '',        /* / */
            // 'contact', /* /contact.html */
            // 'about'    /* /about.html */
          ]
        },
        sidebarDepth: 1,
        lastUpdated: 'Last Updated',
        displayAllHeaders: true // 默认值：false
    }
}
