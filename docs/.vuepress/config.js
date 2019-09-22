module.exports = {
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'promise', link: '/promise/' },
    ],
    sidebar: {
      '/promise/': [
        '',     /* /foo/ */
        'one',  /* /foo/one.html */
        'two'   /* /foo/two.html */
      ],

      '/promise/': [
        '',      /* /bar/ */
        'one', /* /bar/three.html */
        'two'   /* /bar/four.html */
      ],
    }
  }
}
