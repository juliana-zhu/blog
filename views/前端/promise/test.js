function fn(){
    // 可能函数中抛出了 同步错误 要通过try-catch 捕获异常
    // throw new Error('err');
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            reject('xxx');
        }, 3000);
    })
}
Promise.try = function(callback){
    return new Promise((resolve,reject)=>{
        // Promise.resolve 只能返回一个成功的promise
        return Promise.resolve(callback()).then(resolve,reject);
    })
}
fn().then((data)=>{
    console.log(data,'---');
},err=>{
    console.log('err:'+err);
});
