# EventEmitter

在Node.js的用于实现各种事件处理的event模块中，定义了EventEmitter类，所以可能触发事件的对象都是一个继承自EventEmitter类的子类实例对象。

| 方法名和参数                    | 描述                                                         |
| :------------------------------ | :----------------------------------------------------------- |
| addListener(event,listener)     | 对指定事件绑定事件处理函数                                   |
| on(event,listener)              | 对指定事件绑定事件处理函数                                   |
| once(event,listener)            | 对指定事件指定只执行一次的事件处理函数                       |
| removeListener(event,listener)  | 对指定事件解除事件处理函数                                   |
| removeAllListeners([event])     | 对指定事件解除所有的事件处理函数                             |
| setMaxListeners(n)              | 指定事件处理函数的最大数量.n为整数值，代表最大的可指定事件处理函数的数量 |
| listeners(event)                | 获取指定事件的所有事件处理函数                               |
| emit(event,[arg1],[arg2],[...]) | 手工触发指定事件                                             |

```javascript
let EventEmitter = require('./events');
let util = require('util');
util.inherits(Bell,EventEmitter);
function Bell(){
  EventEmitter.call(this);
}
let bell = new Bell();
bell.on('newListener',function(type,listener){
  console.log(`对 ${type}  事件增加${listener}`);
});
bell.on('removeListener',function(type,listener){
  console.log(`对${type} 事件删除${listener}`);
});
function teacherIn(thing){
  console.log(`老师带${thing}进教室`);
}
function studentIn(thing){
  console.log(`学生带${thing}进教室`);
}
function masterIn(thing){
  console.log(`校长带${thing}进教室`);
}
bell.on('响',teacherIn);
bell.on('响',studentIn);
bell.once('响',masterIn);
bell.emit('响','书');
console.log('==============');
bell.emit('响','书');
console.log('==============');
bell.removeAllListeners('响');
console.log('==============');
bell.emit('响','书');
```

模拟实现EventEmitter

```javascript
function EventEmitter(){
  this.events = {};//会把所有的事件监听函数放在这个对象里保存
  //指定给一个事件类型增加的监听函数数量最多有多少个
  this._maxListeners = 10;
}
EventEmitter.prototype.setMaxListeners = function(maxListeners){
  this._maxListeners = maxListeners;
}
EventEmitter.prototype.listeners = function(event){
  return this.events[event];
}
//给指定的事件绑定事件处理函数，1参数是事件类型 2参数是事件监听函数
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(type,listener){
  if(this.events[type]){
    this.events[type].push(listener);
    if(this._maxListeners!=0&&this.events[type].length>this._maxListeners){
      console.error(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${this.events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`);
    }
  }else{
    //如果以前没有添加到此事件的监听函数，则赋一个数组
    this.events[type] = [listener];
  }
}
EventEmitter.prototype.once = function(type,listener){
  //用完即焚
 let  wrapper = (...rest)=>{
   listener.apply(this);//先让原始的监听函数执行
   this.removeListener(type,wrapper);
 }
 this.on(type,wrapper);
}
EventEmitter.prototype.removeListener = function(type,listener){
  if(this.events[type]){
    this.events[type] = this.events[type].filter(l=>l!=listener)
  }
}
//移除某个事件的所有监听函数
EventEmitter.prototype.removeAllListeners = function(type){
  delete this.events[type];
}
EventEmitter.prototype.emit = function(type,...rest){
  this.events[type]&&this.events[type].forEach(listener=>listener.apply(this,rest));
}
module.exports = EventEmitter;
```

