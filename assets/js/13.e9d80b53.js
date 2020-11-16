(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{497:function(t,s,a){t.exports=a.p+"assets/img/react-life-cycle-old.86f3858d.jpg"},498:function(t,s,a){t.exports=a.p+"assets/img/react-life-cycle-new.7d456cb0.jpg"},523:function(t,s,a){"use strict";a.r(s);var e=a(4),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"react-生命周期"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#react-生命周期"}},[t._v("#")]),t._v(" React 生命周期")]),t._v(" "),e("h2",{attrs:{id:"旧生命周期"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#旧生命周期"}},[t._v("#")]),t._v(" 旧生命周期")]),t._v(" "),e("p",[e("img",{attrs:{src:a(497),alt:""}})]),t._v(" "),e("h2",{attrs:{id:"新生命周期"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#新生命周期"}},[t._v("#")]),t._v(" 新生命周期")]),t._v(" "),e("p",[e("img",{attrs:{src:a(498),alt:""}})]),t._v(" "),e("h3",{attrs:{id:"getderivedstatefromprops"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#getderivedstatefromprops"}},[t._v("#")]),t._v(" getDerivedStateFromProps")]),t._v(" "),e("ul",[e("li",[t._v("static getDerivedStateFromProps(props, state) 这个生命周期的功能实际上就是将传入的props映射到state上面，其返回的值会作为state的值")])]),t._v(" "),e("h3",{attrs:{id:"getsnapshotbeforeupdate"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#getsnapshotbeforeupdate"}},[t._v("#")]),t._v(" getSnapshotBeforeUpdate")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("getSnapshotBeforeUpdate() 被调用于"),e("strong",[t._v("render之后")]),t._v("，可以读取但无法使用DOM的时候。它使您的组件可以在可能更改之前从DOM捕获一些信息（例如滚动位置）。此生命周期返回的任何值都将作为参数传递给componentDidUpdate(pervProps, pervState, snapshotReturnData)")])]),t._v(" "),e("li",[e("div",{staticClass:"language-javascript line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSnapshotBeforeUpdate")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//很关键的，我们获取当前rootNode的scrollHeight，传到componentDidUpdate 的参数perScrollHeight")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("wrapper"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("current"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollHeight"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("componentDidUpdate")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("pervProps"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pervState"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prevScrollHeight")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" curScrollTop "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("wrapper"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("current"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//当前向上卷去的高度")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//当前向上卷去的高度加上增加的内容高度")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("wrapper"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("current"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" curScrollTop "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("wrapper"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("current"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollHeight "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" prevScrollHeight"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br")])])]),t._v(" "),e("li")])])}),[],!1,null,null,null);s.default=r.exports}}]);