# 柯里化和反柯里化

```javascript
// 反柯里化
// 1)
const uncurrying = fn =>(...args)=>{
  return fn.call(...args)
}
let checkType = uncurrying(Object.prototype.toString);
let type = checkType(1);
// 2)-----------
Function.prototype.uncurrying = function(){
  return (...args)=>{
      return this.call(...args);
  }
}
let checkType = Object.prototype.toString.uncurrying();

// 展开方法
Array.prototype.myFlat = function(n=1){
    if(n == 0) { return this; }
    return this.reduce((a,b)=>{
        if(Array.isArray(b)){ // 只要是是数组就递归展开即可
            return a.concat(b.myFlat(--n));
        }else{
            return [...a,b];
        }
    },[]);
}
console.log([1,[1,2,[3,4,[5]]],3].myFlat(Infinity));

// reduce方法
Array.prototype.reduce = function(callback,prev){
  for(let i = 0; i < this.length;i++){
      if(typeof prev === 'undefined'){
          prev = callback(this[i],this[i+1],i+1,this);
          i++;
      }else{
          prev = callback(prev,this[i],i,this);
      }
  }
  return prev;
}
```

