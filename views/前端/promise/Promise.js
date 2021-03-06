const PENDING = 'PENDING';
const REJECT = 'REJECT';
const FULFILLED = 'FULFILLED';
const resolvePromise = (promise2, x, resolve, reject)=>{
    if(promise2 === x){
        return reject(new TypeError('eror'));
    }
    if((typeof x === 'object' && x!== null) || typeof x === 'function'){
        let then = x.then;
        if(typeof then === 'function'){
            then.call(x,(y)=>resolve(y), (r)=>reject(r))
        }else{
            resolve(x);
        }
    }else{
        return resolve(x);
    }
}
class Promise {
    constructor(executor) {
        this.value = undefined;
        this.reason = undefined;
        this.status = PENDING;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = (val) => {
            if (this.status === PENDING) {
                this.value = val
                this.status = FULFILLED
                this.onResolvedCallbacks.forEach(f => f());
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECT
                this.onRejectedCallbacks.forEach(f => f());
            }
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        const promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                const x = onFulfilled(this.value)
                resolvePromise(promise2,x,resolve,reject);
            }
            if (this.status === REJECT) {
                const x = onRejected(this.reason);
                resolvePromise(promise2,x,resolve,reject);
            }
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    const x = onFulfilled(this.value);
                    resolvePromise(promise2,x,resolve,reject);
                });
                this.onRejectedCallbacks.push(() => {
                    const x = onRejected(this.value);
                    resolvePromise(promise2,x,resolve,reject);
                });
            }
        })
        return promise2;
    }
}

let p = new Promise(((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    })
}));
p.then(val => {
    console.log(val);
    return new Promise((resolve, reject)=>{
        resolve('ok')
    });
}).then(val => {
    console.log(val + '1')
})


