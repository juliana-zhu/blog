---
title: React笔记1
date: 2019-03-15
sidebar: 'auto'
categories:
 - 前端
tags:
 - React
 - 笔记
publish: true
---
# React笔记1
## JSX

+ JSX其实只是一种语法糖,最终会通过babel转译成createElement语法
    ```javascript 1.6
    ReactDOM.render(<div>hello,<span>Juliana</span></div>);
    ReactDOM.render(React.createElement("div",null,"hello,",React.createElement("span",null,"Juliana")));
    ```
+ 循环时需要带key属性
+ 如果换行需要用()包裹
+ class要写成className
+ jsx里如果想使用一个变量，需要放在大括号里
  
## createElement
+ 创建虚拟DOM

## render函数
+ 模拟render实现
```javascript 1.6
    let render = (eleObj,container)=>{
        // 先取出第一层 进行创建真实dom
        let {type,props} = eleObj;
        let elementNode = document.createElement(type); // 创建第一个元素
        for(let attr in props){ // 循环所有属性
            if(attr === 'children'){ // 如果是children表示有嵌套关系
                if(typeof props[attr] == 'object'){ // 看是否是只有一个文本节点
                    props[attr].forEach(item=>{ // 多个的话循环判断 如果是对象再次调用render方法
                        if(typeof item === 'object'){
                            render(item,elementNode)
                        }else{ //是文本节点 直接创建即可
                            elementNode.appendChild(document.createTextNode(item));
                        }
                    })
                }else{ // 只有一个文本节点直接创建即可
                    elementNode.appendChild(document.createTextNode(props[attr]));
                }
            }else if(attr === 'className'){ // 是不是class属性 class 属性特殊处理
                elementNode.setAttribute('class',props[attr]);
            }else{
                elementNode.setAttribute(attr,props[attr]);
            }
        }
        container.appendChild(elementNode)
    };
```

## 组件
+ 两种定义方式
    ```javascript 1.6
    // 函数组件
    function Build(props) {
      return <p>{props.name} {props.age}</p>
    }
    render(<div>
      <Build name={school1.name} age={school1.age}/>
      <Build {...school2} />
    </div>,window.root);
    ```
    ```javascript 1.6
    // 类组件 有状态，this，和生命周期
    class Build extends Component{
      render(){
          let {name,age} = this.props;
          return <p>{name} {age}</p>
      }
    }
    ```

## 绑定事件
+ 给jsx元素绑定事件要注意事件中的this指向
    ```javascript 1.6
    /**
     * 解决this指针的三种方法
     * 1.this.add.bind(this)
     *   render(){
     *        // 给react元素绑定事件默认this是undefined,bind方式 在就是箭头函数
     *        return <h1 onClick={this.add.bind(this)}>+</h1>
     *    }
     * 2.使用匿名函数()=>{}
     *   render(){
     *        // 给react元素绑定事件默认this是undefined,bind方式 在就是箭头函数
     *        return <h1 onClick={()=>this.add()}>+</h1>
     *    }
     * 3.使用类的属性
     *   add = () =>{
     *    this.setState({number: this.state.number+1})
     *   }
     */
    ```

## 属性校验 默认属性
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; //引入属性校验的模块
// propTypes和defaultProps名字不能更改，这是react规定好的名称
class School extends React.Component{ // 类上的属性就叫静态属性
    static propTypes = { // 校验属性的类型和是否必填
        age:PropTypes.number.isRequired, // 支持的类型可以参考prop-types的readme文件
    };
    static defaultProps = { // 先默认调用defaultProps
        name:'abc',
        age:1
    }; // 默认属性
    constructor(props){ //如果想在构造函数中拿到属性需要通过参数的方式
         //不能在组件中更改属性 不能修改属性*
        super();
    }
    render(){
        return <h1>{this.props.name} {this.props.age}</h1>
    }
}
```

## 复合组件
+ 父子通信
    + 父通过设置子组件参数给子组件传递 （单向数据流）
    ```javascript 1.6
    class Panel extends Component{
        render(){
            let {header,body} = this.props;
            return (
                <div className="container">
                    <div className="panel-default panel">
                        <Header head={header}></Header>
                        <Body b={body}/>
                    </div>
                </div>
            )
        }
    } // react种需要将属性一层层向下传递 单向数据流
    class Body extends Component{
        render(){return (<div className="panel-body">{this.props.b}</div>)}
    }
    class Header extends Component{
        render(){return (<div className="panel-heading">{this.props.head}</div>)}
    }
    let data = {header:'header',body:'body'};
    ReactDOM.render(<Panel {...data}/>,window.root);
    ```
    + 子组件向父组件的通信，通过父亲传递给儿子一个函数，儿子调用父亲的函数将值传递给父亲，父亲更新值
    ```javascript 1.6
    class Panel extends Component{
        constructor(){
            super();
            this.state = {color:'primary'}
        }
        changeColor=(color)=>{ //到时候儿子传递一个颜色
            this.setState({color});
        };
        render(){
            return (
                <div className="container">
                    <div className={"panel-"+this.state.color+" panel"}>
                        <Header head={this.props.header}
                                change={this.changeColor}
                        ></Header>
                    </div>
                </div>
            )
        }
    }
    class Header extends Component{
        handleClick = ()=>{
            this.props.change('danger'); //调用父亲的方法
        };
        render(){return (
            <div className="panel-heading">
            {this.props.head} <button className="btn btn-danger" onClick={this.handleClick}>改颜色</button>
            </div>)}
    }

    ```

## 受控组件和非受控组件
+ 受控组件（受状态控制的组件）
    - 必须要有onChange方法
    - 可以赋予默认值
+ 非受控组件
    - 通过refs得到绑定的dom元素

## 访问真实DOM节点

```javascript
// 获取ref的三种方法

// 当ref的值是一个字符串时
<input ref="a" />+<input ref="b" /><button onClick={this.handleAdd}>=</button><input ref="c" />
let a = (this.refs.a as HTMLInputElement).value; // 获取ref

// 当ref是一个函数
<input ref={ref => this.a = ref} />+<input ref={ref => this.b = ref} /><button onClick={this.handleAdd}>=</button><input ref={ref => this.result = ref} />
let a = this.a.value; // 获取ref

// 给dom元素设置ref
this.a = React.createRef();
<input ref={this.a} />+<input ref={this.b} /><button onClick={this.handleAdd}>=</button><input ref={this.result} />
let a = this.a.current.value; // 获取ref
```

## 状态

- 组件的数据来源有两个地方，分别是**属性对象**(props)和**状态对象**(state)
- 属性是父组件传递过来的(默认属性，属性校验)
- 状态是自己内部的,改变状态唯一的方式就是`setState`
- 属性和状态的变化都会影响视图更新
- 构造函数是唯一可以给 `this.state` 赋值的地方，其他地方都要使用`setState`来设置
- 出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用，因此有时可能会出现数据没有更新的现象
- 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态
- 可以让 setState() **接收一个函数**而不是一个对象。这个函数用上一个 state 作为第一个参数

