module.exports = {
    title: "🐾Juliana's note",
    description: 'Juliana的学习笔记',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: [
            {text: '主页', link: '/'},
            {text: 'Promise', link: '/promise/'},
            {text: 'ES6', link: '/es6/'},
            {text: '浏览器', link: '/browser/'},
            {text: 'node', link: '/node/'},
        ],
        // sidebar: [
        //     {
        //         title: '浏览器',   // 必要的
        //         path: '/browser/',      // 可选的, 应该是一个绝对路径
        //         collapsable: false, // 可选的, 默认值是 true,
        //         sidebarDepth: 2,    // 可选的, 默认值是 1
        //         children: [
        //               '/',
        //               '/chrome的进程架构',
        //               '/TCP',
        //               '/HTTP'
        //         ]
        //     },
        //     {
        //         title: 'Promise',   // 必要的
        //         path: '/promise/',      // 可选的, 应该是一个绝对路径
        //         collapsable: false, // 可选的, 默认值是 true,
        //         sidebarDepth: 2,    // 可选的, 默认值是 1
        //         children: [
        //               '/',
        //               '/all&race&try',
        //
        //         ]
        //     }
        // ],
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
            '',
            'Class',
            'curry&uncurry',
            'DeepClone'
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
