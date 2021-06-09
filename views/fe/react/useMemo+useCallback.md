---
title:  useMemo 和 useCallback的实现
date: 2020-10-05
sidebar: 'auto'
categories:
 - 前端
tags:
 - React
publish: true
---

+ useMemo 和 useCallback的实现

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const hookStates = [];
let hookIndex = 0;
function useState(initialState){
    hookStates[hookIndex] = hookStates[hookIndex]||initialState;
    let currentIndex = hookIndex;
    function setState(newState){
        hookStates[currentIndex]=newState;
        render();
    }
    return [hookStates[hookIndex++],setState];
}
function useMemo(factory,deps){
    if(hookStates[hookIndex]){
        let [lastMemo,lastDeps] = hookStates[hookIndex];
        let same = deps.every((item,index:number)=>item === lastDeps[index]);
        if(same){
            hookIndex++;
            return lastMemo;
        }
    }
    let newMemo = factory();
    hookStates[hookIndex++]=[newMemo,deps];
    return newMemo;
}
function useCallback(callback,deps){
    if(hookStates[hookIndex]){
        let [lastCallback,lastDeps] = hookStates[hookIndex];
        let same = deps.every((item,index)=>item === lastDeps[index]);
        if(same){
            hookIndex++;
            return lastCallback;
        }
    }
    hookStates[hookIndex++]=[callback,deps];
    return callback;
}

let  Child = ({data,handleClick})=>{
    console.log('Child render');
    return (
        <button onClick={handleClick}>{data.number}</button>
    )
}
class PureComponent extends React.Component {
    shouldComponentUpdate(newProps,nextState) {
        return !shallowEqual(this.props, newProps)||!shallowEqual(this.state, nextState);
    }
}
function shallowEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    if (typeof obj1 != "object" ||obj1 === null ||typeof obj2 != "object" ||obj2 === null) {
        return false;
    }
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}
function memo(OldComponent){
    return class extends PureComponent{
        render(){
            return <OldComponent {...this.props}/>
        }
    }
}
Child = memo(Child);

function App(){
    console.log('App render');
    const[name,setName]=useState('test');
    const[number,setNumber]=useState(0);
    let data = useMemo(()=>({number}),[number]);
    let handleClick = useCallback(()=> setNumber(number+1),[number]);
    return (
        <div>
            <input type="text" value={name} onChange={event=>setName(event.target.value)}/>
            <Child data={data} handleClick={handleClick}/>
        </div>
    )
}

function render(){
    hookIndex=0;
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}
render();

```
